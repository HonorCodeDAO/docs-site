import React, { useState, useEffect, useCallback } from 'react';
import { 
  Wallet, 
  Users, 
  Award, 
  ArrowRightLeft, 
  RefreshCw, 
  ChevronDown,
  ExternalLink,
  BarChart3,
  TrendingUp,
  Target,
  Globe,
  AlertTriangle,
  ChevronRight,
  Info
} from 'lucide-react';
import { ethers } from 'ethers';

import { STT_ABI } from './honor_abi';
import { ARTIFACT_ABI } from './artifact_abi';
import { HF_ABI } from './honorfactory_abi';

(window as any).ethers = ethers;

declare global {
  interface Window {
    ethereum?: any;
  }
}

// ==================== TYPES & INTERFACES ====================

interface Artifact {
  address: string;
  location: string;
  isValidated: boolean;
  balance: bigint;
  honorWithin: bigint;
  builder: string;
  honorAmtPerVouch: bigint;
  totalSupply: bigint;
  accHonorHours: bigint;
  userBalance: bigint;
}

interface OrganizationData {
  artifacts: Artifact[];
  totalSupply: bigint;
  userBalances: { [address: string]: bigint };
  contractAddress: string;
  name: string;
  description: string;
}

interface NetworkConfig {
  chainId: bigint;
  name: string;
  contracts: {
    stt: string;
    honorFactory: string;
    artifactory: string;
  };
}

interface Organization {
  address: string;
  name: string;
}

interface OrganizationSelectorProps {
  provider: any;
  signer: any;
  currentNetwork: string;
  onSelectOrganization: (address: string) => Promise<void>;
}

// ==================== CONFIGURATION ====================

const NETWORK_CONFIGS: { [key: string]: NetworkConfig } = {
  localhost: {
    chainId: 31337n,
    name: 'Hardhat Local',
    contracts: {
      stt: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
      honorFactory: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9", 
      artifactory: "0x5FbDB2315678afecb367f032d93F642f64180aa3"
    }
  },
  mainnet: {
    chainId: 1n,
    name: 'Ethereum Mainnet',
    contracts: {
      stt: "0x1234567890123456789012345678901234567890", 
      honorFactory: "0xYourFactoryAddress",
      artifactory: "0xYourArtifactoryAddress"
    }
  },
  optimism: {
    chainId: 10n,
    name: 'Optimism Mainnet',
    contracts: {
      stt: "0x1234567890123456789012345678901234567890", 
      honorFactory: "0x8Dd1dA185430770F48b79608305B3eD6400C6078",
      artifactory: "0xA898ea12D7F24a52CC592D539D2b6C3e05976bD8"
    }
  }
};


// ==================== UTILITY FUNCTIONS ====================

export const DISPLAY_DECIMALS: number = 4;
export const formatDecimal = (value: number | bigint | string): string => {
  const num = typeof value === 'string' ? parseFloat(value) : Number(value);
  return num.toFixed(DISPLAY_DECIMALS);
};

export const formatDisplayValue = (value: string): string => {
  const regex = new RegExp(`^\\d*\\.?\\d{0,${DISPLAY_DECIMALS}}`);
  const match = value.match(regex);
  return match ? match[0] : '';
};

/**
 * Formats BigInt token amounts to human-readable strings
 * Critical: Always use this instead of || fallbacks for BigInt values
 */
function formatTokenAmount(value: bigint | undefined | null, decimals: number = 18): string {
  if (value == null) {
    return "0";
  }
  
  // Convert BigInt to string with decimal places
  const divisor = 10n ** BigInt(decimals);
  const wholePart = value / divisor;
  const fractionalPart = value % divisor;
  
  if (fractionalPart === 0n) {
    return wholePart.toString();
  }
  
  const fractionalStr = fractionalPart.toString().padStart(decimals, '0');
  const trimmedFractional = fractionalStr.replace(/0+$/, '');
  
  return formatDisplayValue(trimmedFractional ? `${wholePart}.${trimmedFractional}` : wholePart.toString());
}

/**
 * Formats BigInt to number for display purposes
 * Warning: May lose precision for very large numbers
 */
function formatTokenAmountAsNumber(value: bigint | undefined | null, decimals: number = 18): number {
  if (value == null) {
    return 0;
  }
  
  return parseFloat(formatTokenAmount(value, decimals));
}

/**
 * Validates network connection and throws descriptive errors
 */
async function validateNetworkConnection(provider: any, expectedChainId: bigint): Promise<void> {
  const network = await provider.getNetwork();
  
  if (network.chainId !== expectedChainId) {
    throw new Error(
      `Wrong network! Please switch MetaMask to chain ID ${expectedChainId}. ` +
      `Currently connected to: ${network.name} (${network.chainId})`
    );
  }
}

/**
 * Validates contract deployment at address
 */
async function validateContractDeployment(provider: any, contractAddress: string): Promise<void> {
  const code = await provider.getCode(contractAddress);
  if (code === "0x") {
    throw new Error(
      `No contract found at ${contractAddress} on current network. ` +
      `Please check the contract address and ensure it's deployed on this network.`
    );
  }
}

function formatAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}


const OrganizationSelector: React.FC<OrganizationSelectorProps> = ({ 
  provider,
  signer,
  currentNetwork,
  onSelectOrganization 
}) => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newOrgName, setNewOrgName] = useState('');
  const [error, setError] = useState('');
  const [orgBlockNumber, setOrgBlockNumber] = useState(() => {
    const saved = localStorage.getItem('lastKnownBlockNumber');
    return saved ? parseInt(saved) : 0;
  });

  useEffect(() => { 
    if (provider && signer) { 
      loadOrganizations();
    } else {
      console.log('Missing provider or signer, not loading');
    }
  }, []);

  const validate = async () => {
    const currentBlockNumber = await provider.getBlockNumber();
  
    // If block number went backwards, chain was restarted
    if (orgBlockNumber && currentBlockNumber < orgBlockNumber) {
      console.log('Chain restarted (block number reset), clearing cache');
      setOrganizations([]);
      await provider.send("hardhat_mine", [`0x${(orgBlockNumber-currentBlockNumber).toString(16)}`]);
    }
    setOrgBlockNumber(currentBlockNumber);
    
    localStorage.setItem('lastKnownBlockNumber', currentBlockNumber.toString());
    // await validateNetworkConnection(this.provider, this.networkConfig.chainId);
  }

  const loadOrganizations = async () => { 
    if (!provider || !signer) return;
    
    const HONOR_FACTORY_ADDRESS = NETWORK_CONFIGS[currentNetwork].contracts.honorFactory; // '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9'
    
    try {
      setLoading(true);
      const factoryContract = new ethers.Contract(
        HONOR_FACTORY_ADDRESS, 
        HF_ABI, 
        provider
      );
       
      // Get list of all Honor contract addresses
 
      const addressList: string[] = await factoryContract.readHonorList(); 


      // Get names for each address
      const orgsWithNames: Organization[] = await Promise.all(
        addressList.map(async (address: string) => {
          const name = await factoryContract.getHonorArtiFactory(address);
          return { address, name };
        })
      );
      
      setOrganizations(orgsWithNames);
    } catch (error) {
      console.error('Error loading organizations:', error);
      setError('Failed to load organizations');
    } finally {
      setLoading(false);
    }
  };

  const createNewOrganization = async () => {
    if (!newOrgName.trim()) {
      setError('Please enter an organization name');
      return;
    }
    
    try {
      setCreating(true);
      setError('');

      const HONOR_FACTORY_ADDRESS = NETWORK_CONFIGS[currentNetwork].contracts.honorFactory; // '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9'
      const ARTIFACTORY_ADDRESS = NETWORK_CONFIGS[currentNetwork].contracts.artifactory; //'0x5FbDB2315678afecb367f032d93F642f64180aa3'

      const factoryContract = new ethers.Contract(
        HONOR_FACTORY_ADDRESS, 
        HF_ABI, 
        signer
      );
      
      const tx = await factoryContract.createHonor(ARTIFACTORY_ADDRESS, newOrgName.trim(), { gasLimit: 4000000 });
      const receipt = await tx.wait();
      
      // Get the new Honor contract address from the event
      // const event = receipt.events?.find((e: any) => e.event === 'HonorCreated');
      const event = receipt.logs?.find((log: any) => {
        try {
          const parsed = factoryContract.interface.parseLog(log);
          return parsed?.name === 'HonorCreated';
        } catch {
          return false;
        }
      });
      const newHonorAddress = event?.args?.honorAddress;
      
      if (newHonorAddress) {
        // Add to local state immediately
        const newOrg = { address: newHonorAddress, name: newOrgName.trim() };
        setOrganizations(prev => [...prev, newOrg]);
        
        // Clear form
        setNewOrgName('');
        setShowCreateForm(false);
        
        // Auto-select the new organization
        onSelectOrganization(newHonorAddress);
      }
    } catch (error: unknown) {
      console.error('Error creating organization:', error);
      if (error instanceof Error) {
        setError(`Failed to create organization: ${error.message}`);
      } else {
        setError('Failed to create organization');
      }
    } finally {
      setCreating(false);
    }
  };

  const handleSelectOrg = (address: string) => {
    // Update URL
    window.history.pushState(null, '', `?org=${address}`);
    onSelectOrganization(address);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading organizations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">HONOR Organizations</h1>
          <p className="text-gray-600">Select an organization to manage or create a new one</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Create New Organization Section */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Create New Organization</h2>
          
          {!showCreateForm ? (
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              + Create New Organization
            </button>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Organization Name
                </label>
                <input
                  type="text"
                  value={newOrgName}
                  onChange={(e) => setNewOrgName(e.target.value)}
                  placeholder="Enter organization name"
                  className="w-full max-w-md p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={createNewOrganization}
                  disabled={creating || !newOrgName.trim()}
                  className="bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  {creating ? 'Creating...' : 'Create Organization'}
                </button>
                <button
                  onClick={() => {
                    setShowCreateForm(false);
                    setNewOrgName('');
                    setError('');
                  }}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Existing Organizations */}
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Existing Organizations ({organizations.length})</h2>
          </div>
          
          {organizations.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <p>No organizations found. Create the first one above!</p>
            </div>
          ) : ( <div className="max-h-96 overflow-y-auto"> 
            <div className="divide-y divide-gray-200">
              {organizations.map((org) => (
                <div 
                  key={org.address}
                  className="px-4 py-2 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => handleSelectOrg(org.address)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base  font-medium text-gray-900 mb-1">{org.name}</h3>
                      <p className="text-xs text-gray-500 font-mono">{org.address}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectOrg(org.address);
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors" 
                    >
                      Select
                    </button>
                  </div>
                </div>
              ))}
            </div> 
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Once selected, you'll be taken to the organization's HONOR management interface</p>
        </div>
      </div>
    </div>
  );
};


// ==================== CONTRACT MANAGER ====================

class ContractManager {
  private contracts = new Map<string, any>();
  private provider: any;
  private signer: any;

  private lastBlockNumber: any;

  public networkConfig: NetworkConfig;

  constructor(provider: any, signer: any, networkConfig: NetworkConfig) {
    // this.provider = new ethers.JsonRpcProvider('http://localhost:8545'); // Use direct connection
    this.provider = provider;
    this.signer = signer;
    this.networkConfig = networkConfig;
    this.lastBlockNumber = null;
  }

  /**
   * Check if we're in mock mode (no real provider or explicit mock flag)
   */
  private isMockMode(): boolean {
    return !this.provider || !window.ethereum;
  }

  /**
   * Validates connection before any contract operations
   * For development: Skip validation when using mocks
   */
  private async validateConnection(): Promise<void> {

    const currentBlockNumber = await this.provider.getBlockNumber();
  
    // If block number went backwards, chain was restarted
    if (this.lastBlockNumber && currentBlockNumber < this.lastBlockNumber) {
      console.log('Chain restarted (block number reset), clearing cache');
      this.contracts.clear();
      await this.provider.send("hardhat_mine", [`0x${(this.lastBlockNumber-currentBlockNumber).toString(16)}`]);
    }
    this.lastBlockNumber = currentBlockNumber;
    
    await validateNetworkConnection(this.provider, this.networkConfig.chainId);
  }

  /**
   * Gets STT contract instance with validation
   */
  async getSTTContract(address?: string): Promise<any> {
    if (this.networkConfig.name == "Hardhat Local") {
      await this.validateConnection();
    }

    const contractAddress = address || this.networkConfig.contracts.stt;
    if (!contractAddress) {
      throw new Error(`No STT contract address configured for ${this.networkConfig.name}`);
    }

    const contract = new ethers.Contract(contractAddress, STT_ABI, this.provider);


    // Skip contract deployment validation for mocks
    if (true) { // } !this.isMockMode()) {
      await validateContractDeployment(this.provider, contractAddress);
    }

    const contractKey = `artifact_${address}_${this.networkConfig.contracts.stt}`; //`stt_${contractAddress}`;
    if (!this.contracts.has(contractKey)) {
      const contract = new ethers.Contract(contractAddress, STT_ABI, this.provider);

      this.contracts.set(contractKey, contract);
    }

    return this.contracts.get(contractKey);
  }

  async proposeArtifact(fromAddress: string, builderAddress: string, location: string, shouldValidate: boolean) {
    const contract = await this.getSTTContract();
    const contractWithSigner = contract.connect(this.signer);
    const tx = await contractWithSigner.proposeArtifact(fromAddress, builderAddress, location, shouldValidate);
    return tx;
  }

  async vouchArtifact(fromAddress: string, toAddress: string, amount: bigint, isHonor: boolean) {
    const contract = await this.getSTTContract();
    const contractWithSigner = contract.connect(this.signer);
    const tx = await contractWithSigner.vouch(fromAddress, toAddress, amount, isHonor, { gasLimit: 400000 });
    return tx;
  }

  /**
   * Gets Artifact contract instance with validation
   */
  async getArtifactContract(address: string): Promise<any> {
    if (this.networkConfig.name == "Hardhat Local") {
      await this.validateConnection();
    }
    
    // Skip contract deployment validation for mocks  
    if (true) { // !this.isMockMode()) {
      await validateContractDeployment(this.provider, address);
    }

    const contractKey = `artifact_${address}_${this.networkConfig.contracts.stt}`;
    if (!this.contracts.has(contractKey)) {
      // Use mock for development - replace with: new ethers.Contract(address, ARTIFACT_ABI, this.provider)
      // const mockContract = this.createMockArtifactContract(address);
      const contract = new ethers.Contract(address, ARTIFACT_ABI, this.signer);

      this.contracts.set(contractKey, contract);
    }

    return this.contracts.get(contractKey);
  }

  // ==================== MOCK IMPLEMENTATIONS (Remove in production) ====================
  
  private createMockSTTContract() {
    const mockArtifacts = [
      '0x1a2b3c4d5e6f7890abcdef1234567890abcdef12',
      '0x2b3c4d5e6f7890abcdef1234567890abcdef1234',
      '0x3c4d5e6f7890abcdef1234567890abcdef123456'
    ];

    return {
      getAllArtifacts: async () => mockArtifacts,
      totalSupply: async () => 10000000000000000000000n, // 10,000 tokens with 18 decimals
      owner: async () => '0x1234567890123456789012345678901234567890',
      vouch: async (from: string, to: string, amount: bigint, isHonor: boolean) => {
        console.log(`Mock vouch: ${amount} from ${from} to ${to}`);
        return { hash: '0x' + Math.random().toString(16).substr(2, 64) };
      },
      proposeArtifact: async (fromAddress: string, builderAddress: string, location: string, shouldValidate: boolean) => {
        console.log(`Mock proposeArtifact: from=${fromAddress}, builder=${builderAddress}, location=${location}, validate=${shouldValidate}`);
        const newArtifactAddress = '0x' + Math.random().toString(16).substr(2, 40);
        return { 
          hash: '0x' + Math.random().toString(16).substr(2, 64),
          artifactAddress: newArtifactAddress
        };
      }
    };
  }

  private createMockArtifactContract(address: string) {
    const mockData: { [key: string]: any } = {
      '0x1a2b3c4d5e6f7890abcdef1234567890abcdef12': {
        location: 'core/authentication',
        isValidated: true,
        honorWithin: 2850000000000000000000n, // 2,850 tokens
        builder: '0xa1b2c3d4e5f6789012345678901234567890abcd',
        honorAmtPerVouch: 25000000000000000000n, // 25 tokens
        totalSupply: 3200000000000000000000n,
        accHonorHours: 150000n,
        userBalance: 150000000000000000000n // 150 tokens
      },
      '0x2b3c4d5e6f7890abcdef1234567890abcdef1234': {
        location: 'ui/dashboard',
        isValidated: true,
        honorWithin: 1920000000000000000000n,
        builder: '0xb2c3d4e5f6789012345678901234567890abcdef',
        honorAmtPerVouch: 18000000000000000000n,
        totalSupply: 2400000000000000000000n,
        accHonorHours: 98000n,
        userBalance: 240000000000000000000n
      },
      '0x3c4d5e6f7890abcdef1234567890abcdef123456': {
        location: 'api/rewards',
        isValidated: false,
        honorWithin: 1200000000000000000000n,
        builder: '0xc3d4e5f6789012345678901234567890abcdef12',
        honorAmtPerVouch: 15000000000000000000n,
        totalSupply: 1800000000000000000000n,
        accHonorHours: 72000n,
        userBalance: 80000000000000000000n
      }
    };

    const data = mockData[address] || mockData['0x1a2b3c4d5e6f7890abcdef1234567890abcdef12'];

    return {
      location: async () => data.location,
      isValidated: async () => data.isValidated,
      honorWithin: async () => data.honorWithin,
      builder: async () => data.builder,
      honorAmtPerVouch: async (vouchAmt: bigint) => data.honorAmtPerVouch * vouchAmt,
      totalSupply: async () => data.totalSupply,
      accHonorHours: async () => data.accHonorHours,
      balanceOf: async (account: string) => data.userBalance
    };
  }
}


  // ==================== GENERATE ARTIFACT MODAL ====================

const GenerateArtifactModal = ({ 
  isGenerateModalOpen, 
  setIsGenerateModalOpen,
  orgData, 
  currentAccount,
  fromAddress,
  setFromAddress,
  builderAddress,
  setBuilderAddress, 
  location,
  setLocation,
  shouldValidate,
  setShouldValidate,
  onClose,
  onGenerate, 
  setError,
  error
}: any) => {

  // console.log('Modal render, isOpen:', generateModal.isOpen);
  if (!isGenerateModalOpen || !orgData) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-96 max-w-md mx-4">
        <h3 className="text-xl font-bold mb-4">Generate New Artifact</h3>
        <p className="text-sm text-gray-600 mb-4">
          Create a new artifact using the proposeArtifact function. This will deploy a new artifact contract.
        </p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">From Address</label>
            <select 
              value={fromAddress} 
              onChange={(e) => setFromAddress(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">Select source address</option> 
              {orgData.artifacts.map((artifact: Artifact) => (
                <option key={artifact.address} value={artifact.address}>
                  {artifact.location} ({formatAddress(artifact.address)})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Builder Address</label>
            <input
              type="text"
              value={builderAddress} 
              onChange={(e) => setBuilderAddress(e.target.value)}
              placeholder="0x... (who will build this artifact)"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <button 
              onClick={() => setBuilderAddress(currentAccount)}
              className="text-xs text-purple-600 hover:text-purple-700 mt-1"
            >
              Use your address
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location/Name</label>
            <input
              type="text"
              value={location} 
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="shouldValidate"
              checked={shouldValidate}
              onChange={(e) => setShouldValidate(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="shouldValidate" className="text-sm text-gray-700">
              Auto-validate artifact after creation
            </label>
          </div>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <div className="flex space-x-3 mt-6">
          <button
            onClick={() => {
              setFromAddress('');
              setBuilderAddress('');
              setLocation('');
              setShouldValidate(false);
              setIsGenerateModalOpen(false);
              setError('');
            }}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onGenerate}
            disabled={!fromAddress || !builderAddress || !location}
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Generate Artifact
          </button>
        </div>
      </div>
    </div>
  );
};

interface MiniCurveProps {
  honorCurrent: number;
  honorFuture: number;
  isFromArtifact: boolean; // Just to set color/title
  width?: number;
  height?: number;
  zoomLevel?: number;
}

const MiniCurve: React.FC<MiniCurveProps> = ({ 
  honorCurrent, 
  honorFuture, 
  isFromArtifact,
  width = 300, 
  height = 180,
  zoomLevel = 1,
}) => {
  const PIVOT: number = Math.pow(2, 30);
  const color = isFromArtifact ? "#ef4444" : "#10b981";
  const title = isFromArtifact ? "From Artifact" : "To Artifact";
  
  if (!honorCurrent || !honorFuture || honorCurrent <= 0 || honorFuture <= 0) {
    return (
      <div className="flex-1">
        <div className="text-xs font-medium mb-1 text-gray-500">
          {isFromArtifact ? "From Artifact" : "To Artifact"}
        </div>
        <div className="w-[140px] h-[100px] border border-gray-200 rounded bg-gray-50 flex items-center justify-center">
          <span className="text-xs text-gray-400">No data</span>
        </div>
      </div>
    );
  }

  if (isNaN(honorCurrent) || isNaN(honorFuture) || 
    honorCurrent <= 0 || honorFuture <= 0 ||
    !isFinite(honorCurrent) || !isFinite(honorFuture)) {
    return (
      <div className="flex-1">
        <div className="text-xs font-medium mb-1 text-gray-500">
          {isFromArtifact ? "From Artifact" : "To Artifact"}
        </div>
        <div className="w-[140px] h-[100px] border border-gray-200 rounded bg-gray-50 flex items-center justify-center">
          <span className="text-xs text-gray-400">Invalid data</span>
        </div>
      </div>
    );
  }

  // const calculateVouchFromHonor = (honor: number): number => {
  //   const normalizedH: number = honor / PIVOT;
  //   return Math.sqrt(normalizedH) * PIVOT;
  // };

  const calculateVouchFromHonor = (honor: number): number => {
  return Math.sqrt(honor) * PIVOT;
};

  // Zoom to relevant range
  const baseRange = Math.abs(honorFuture - honorCurrent); // 10% of the difference
  const buffer = baseRange * 0.1 * zoomLevel;
  const minHonor = Math.max(Math.min(honorCurrent, honorFuture) - buffer, 1); // Don't go below 1
  const maxHonor = Math.max(honorCurrent, honorFuture) + buffer;
  // const minHonor = Math.min(honorCurrent, honorFuture) * 0.95;
  // const maxHonor = Math.max(honorCurrent, honorFuture) * 1.05;
  const minVouch = calculateVouchFromHonor(minHonor);
  const maxVouch = calculateVouchFromHonor(maxHonor);
  
  const margin: number = 30;
  
  const scaleX = (honor: number): number => 
    margin + ((honor - minHonor) / (maxHonor - minHonor)) * (width - 2 * margin);
  
  const scaleY = (vouch: number): number => 
    height - margin - ((vouch - minVouch) / (maxVouch - minVouch)) * (height - 2 * margin);

  const points: Point[] = [];
  for (let i = 0; i <= 50; i++) {
    const honor = minHonor + (i / 50) * (maxHonor - minHonor);
    const vouch = calculateVouchFromHonor(honor);
    points.push({ x: honor, y: vouch });
  }

  const pathD: string = points.map((p: Point, i: number) => 
    `${i === 0 ? 'M' : 'L'} ${scaleX(p.x)} ${scaleY(p.y)}`
  ).join(' ');

  const formatNumber = (num: number): string => {
    if (num >= 1e18) return `${(num / 1e18).toFixed(1)}`;
    return num.toExponential(1);
  };

  return (
    <div className="flex-1">
      <div className="text-xs font-medium mb-1" style={{ color }}>{title}</div>
      <svg width={width} height={height} className="border border-gray-200 rounded bg-white">
        <path d={pathD} fill="none" stroke={color} strokeWidth="2"/>
        <circle cx={scaleX(honorCurrent)} cy={scaleY(calculateVouchFromHonor(honorCurrent))} r="3" fill={color}/>
        <circle cx={scaleX(honorFuture)} cy={scaleY(calculateVouchFromHonor(honorFuture))} r="3" fill={color} fillOpacity="0.6"/>
        
        {/* Movement arrows */}
        {(() => {
          const midX = (scaleX(honorCurrent) + scaleX(honorFuture)) / 2;
          const midY = (scaleY(calculateVouchFromHonor(honorCurrent)) + scaleY(calculateVouchFromHonor(honorFuture))) / 2;
          
          // Calculate angle for triangle direction
          const dx = scaleX(honorFuture) - scaleX(honorCurrent);
          const dy = scaleY(calculateVouchFromHonor(honorFuture)) - scaleY(calculateVouchFromHonor(honorCurrent));
          const angle = Math.atan2(dy, dx) * 180 / Math.PI;
          
          return (
            <polygon
              points="0,-8 16,0 0,8" 
              fill={color}
              transform={`translate(${midX}, ${midY}) rotate(${angle})`}
            />
          );
        })()}

        {/* Labels */} 

        <text x={scaleX(honorCurrent)} y={height-5} textAnchor="middle" fontSize="8" fill="#666">
          {formatNumber(honorCurrent)}
        </text>
        <text x={scaleX(honorFuture)} y={height-5} textAnchor="middle" fontSize="8" fill="#666">
          {formatNumber(honorFuture)}
        </text>

        {/* Y-axis labels */}
        <text x={5} y={scaleY(calculateVouchFromHonor(honorCurrent))} fontSize="8" fill="#666">
          {formatNumber(calculateVouchFromHonor(honorCurrent))}
        </text>
        <text x={5} y={scaleY(calculateVouchFromHonor(honorFuture))} fontSize="8" fill="#666">
          {formatNumber(calculateVouchFromHonor(honorFuture))}
        </text>
      </svg>
    </div>
  );
};


interface DualCurveProps {
  fromHonorCurrent: number;
  fromHonorFuture: number;
  toHonorCurrent: number;
  toHonorFuture: number;
  width?: number;
  height?: number;
}

interface Point {
  x: number;
  y: number;
}

const DualCurve: React.FC<DualCurveProps> = ({ 
  fromHonorCurrent, 
  fromHonorFuture, 
  toHonorCurrent, 
  toHonorFuture,
  width = 300, 
  height = 150 
}) => {
  const PIVOT: number = Math.pow(2, 30);
  
  const calculateVouch = (honor: number): number => {
    const normalizedH: number = honor / PIVOT;
    return (normalizedH * normalizedH) * PIVOT;
  };

  const calculateVouchFromHonor = (honor: number): number => {
    const normalizedH: number = honor / PIVOT;
    return Math.sqrt(normalizedH) * PIVOT;
  };

  const minHonor = Math.min(fromHonorCurrent, fromHonorFuture) * 0.95;
  const maxHonor = Math.max(toHonorCurrent, toHonorFuture) * 1.05;
  const maxVouch = calculateVouchFromHonor(maxHonor);
  
  const margin: number = 30;
  
  // Log scale for x-axis, linear for y-axis
  const scaleX = (honor: number): number => {
    const logHonor = Math.log10(Math.max(honor, minHonor));
    const logMin = Math.log10(minHonor);
    const logMax = Math.log10(maxHonor);
    // return margin + ((logHonor - logMin) / (logMax - logMin)) * (width - 2 * margin);
    return margin + ((honor - minHonor) / (maxHonor - minHonor)) * (width - 2 * margin);

  };
  
  const scaleY = (vouch: number): number => {
    return height - margin - (vouch / maxVouch) * (height - 2 * margin);
  };

  // Generate curve data
  const points: Point[] = [];
  for (let i = 0; i <= 100; i++) {
    const logHonor = Math.log10(minHonor) + (i / 100) * (Math.log10(maxHonor) - Math.log10(minHonor));
    const honor = Math.pow(10, logHonor);
    const vouch = calculateVouchFromHonor(honor);
    points.push({ x: honor, y: vouch });
  }

  const pathD: string = points.map((p: Point, i: number) => 
    `${i === 0 ? 'M' : 'L'} ${scaleX(p.x)} ${scaleY(p.y)}`
  ).join(' ');

  return (
    <div className="mt-2">
      <div className="text-xs text-blue-700 mb-1">Bonding Curves (Log Scale)</div>
      <svg width={width} height={height} className="border border-blue-200 rounded bg-white">
        {/* Grid lines for log scale */}
        {[16, 18, 20, 22, 24].map((exp: number) => (
          <line 
            key={exp}
            x1={scaleX(Math.pow(10, exp))} 
            y1={margin} 
            x2={scaleX(Math.pow(10, exp))} 
            y2={height - margin}
            stroke="#f0f0f0" 
            strokeWidth="1"
          />
        ))}
        
        {/* The curve */}
        <path d={pathD} fill="none" stroke="#3b82f6" strokeWidth="2"/>
        
        {/* FROM artifact points */}
        <circle cx={scaleX(fromHonorCurrent)} cy={scaleY(calculateVouchFromHonor(fromHonorCurrent))} r="4" fill="#ef4444"/>
        <circle cx={scaleX(fromHonorFuture)} cy={scaleY(calculateVouchFromHonor(fromHonorFuture))} r="4" fill="#f87171"/>
        
        {/* TO artifact points */}
        <circle cx={scaleX(toHonorCurrent)} cy={scaleY(calculateVouchFromHonor(toHonorCurrent))} r="4" fill="#10b981"/>
        <circle cx={scaleX(toHonorFuture)} cy={scaleY(calculateVouchFromHonor(toHonorFuture))} r="4" fill="#34d399"/>
        
        {/* Movement arrows */}
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
          </marker>
        </defs>
        
        <line 
          x1={scaleX(fromHonorCurrent)} y1={scaleY(calculateVouchFromHonor(fromHonorCurrent))}
          x2={scaleX(fromHonorFuture)} y2={scaleY(calculateVouchFromHonor(fromHonorFuture))}
          stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowhead)"
        />
        
        <line 
          x1={scaleX(toHonorCurrent)} y1={scaleY(calculateVouchFromHonor(toHonorCurrent))}
          x2={scaleX(toHonorFuture)} y2={scaleY(calculateVouchFromHonor(toHonorFuture))}
          stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowhead)"
        />
        
        {/* Labels */}
        <text x={width/2} y={height-5} textAnchor="middle" fontSize="10" fill="#666">Honor (Log Scale)</text>
        <text x={15} y={height/2} textAnchor="middle" fontSize="10" fill="#666" transform={`rotate(-90 15 ${height/2})`}>Vouch</text>
      </svg>
      
      {/* Legend */}
      <div className="flex text-xs mt-1 space-x-4">
        <div className="flex items-center"><div className="w-3 h-3 bg-red-500 rounded-full mr-1"></div>From</div>
        <div className="flex items-center"><div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>To</div>
      </div>
    </div>
  );
};

 

const HelpPanel = () => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    overview: true,
    vouching: false,
    artifacts: false,
    tips: false
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const Section = ({ id, title, children, defaultExpanded = false } : {
    id: string;
    title: string; 
    children: React.ReactNode;
    defaultExpanded?: boolean;
  }) => {
    const isExpanded = expandedSections[id];
    
    return (
      <div className="border-b border-gray-200 last:border-b-0">
        <button
          onClick={() => toggleSection(id)}
          className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 transition-colors"
        >
          <span className="font-medium text-gray-900">{title}</span>
          {isExpanded ? (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronRight className="w-4 h-4 text-gray-500" />
          )}
        </button>
        {isExpanded && (
          <div className="px-3 pb-3 text-sm text-gray-700 space-y-2">
            {children}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-4 border-b border-gray-200 bg-blue-50">
        <div className="flex items-center space-x-2">
          <Info className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-blue-900">How to Use HONOR</h3>
        </div>
        <p className="text-sm text-blue-700 mt-1">
          Move reputation between projects using bonding curves
        </p>
      </div>

      <div className="divide-y divide-gray-200">
        <Section id="overview" title="What is HONOR?" defaultExpanded={true}>
          <p>
            HONOR is a reputation protocol where you can invest in different projects (artifacts) 
            and move your reputational investment between them. It is a <strong>Semi-transferable token </strong>
            which means it cannot be transfered or sold to other addresses, only special artifact contracts.

            How to gain ownership of these reputational tokens? There are two main ways: 
            earning by building, or locking staked ETH to gradually farm. 
            (Currently this staking feature is unavailable.)

            NOTE: Until one receives HONOR as a builder or farmer, the only way to use this 
            protocol is to create a new org and generate and vouch artifacts.

          </p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li><strong>Artifacts:</strong> Projects to <strong>generate and vouch</strong> for</li>
            <li><strong>Shares:</strong> Your ownership stake in each artifact (how much is vouched) </li>
            <li><strong>Bonding Curve:</strong> Price in HONOR terms will change based on total vouched </li>
          </ul>
        </Section>

        <Section id="vouching" title="Moving Reputation (Vouching)">
          <p className="mb-2">
            Use the <strong>Vouch</strong> button to move reputation between artifacts:
          </p>
          <ol className="list-decimal list-inside space-y-1 ml-2">
            <li>Select <strong>source artifact</strong> (where you have shares)</li>
            <li>Select <strong>destination artifact</strong> (where you want to vouch into)</li>
            <li>Enter amount in Honor or shares</li>
            <li>Review the exchange preview and bonding curves</li>
            <li>Execute the transaction</li>
          </ol>
          <div className="bg-gray-50 border border-gray-200 rounded p-2 mt-2">
            <p className="text-gray-800 text-xs">
              <strong>How Pricing Works:</strong> The bonding curve uses a quadratic formula (H = S*S),
              centered around 1 unit H/S. 
              This means early investments cost less, but prices rise more slowly as total 
              reputation grows. Small artifacts = bigger price swings, large artifacts = more stable.
            </p>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded p-2 mt-2">
            <p className="text-yellow-800 text-xs">
              <strong>Tip:</strong> The curves show how your transaction affects pricing. 
              Zoom out to see the bigger picture.
            </p>
          </div>

        </Section>

        <Section id="artifacts" title="Understanding Artifacts">
          <p className="mb-2">Each artifact shows:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li><strong>Your shares:</strong> How much you own</li>
            <li><strong>Total reputation:</strong> Total vouched for this project component</li>
            <li><strong>Percentage:</strong> Your ownership stake</li>
            <li><strong>Color bars:</strong> Value based on your stake size</li>
          </ul>
          <p className="mt-2">
            The <strong>Root Artifact</strong> represents the organization itself and 
            typically has the most reputation.
          </p>
        </Section>

        <Section id="builders" title="Rewarding Builders">
          <p className="mb-2">Builders gradually receive vouch shares in their artifact. </p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li><strong>Validate</strong> to begin allocating shares to builders </li>
            <li><strong>Decelerated Transfer </strong> Builder shares grow quickly at first, then slowly</li>
            <li><strong>Cubic Formula</strong> (Builder shares)^3 = H * Time </li> 
            <li><strong>Honor dependent</strong> Transfer is faster for smaller artifacts </li>  
          </ul>
          <p className="mt-2">
            For mid-sized artifacts ~1% total supply, the builder share will approach a third after several months.
          </p>
        </Section>
{/*
        <Section id="tips" title="Smart Strategies">
          <div className="space-y-2">
            <div className="bg-green-50 border border-green-200 rounded p-2">
              <p className="text-green-800 text-xs">
                <strong>Early Investment:</strong> Investing in new artifacts when they have 
                less total reputation can be more cost-effective.
              </p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded p-2">
              <p className="text-blue-800 text-xs">
                <strong>Watch the Curves:</strong> The steeper the curve, the more expensive 
                it gets to buy more shares.
              </p>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded p-2">
              <p className="text-purple-800 text-xs">
                <strong>Diversify:</strong> Spreading reputation across multiple artifacts 
                can balance risk and opportunity.
              </p>
            </div>
          </div>
        </Section>*/}
      </div>

      <div className="p-3 bg-gray-50 text-center">
        <p className="text-xs text-gray-600">
          Each transaction shows a preview before you confirm.
        </p>
      </div>
    </div>
  );
};

// export default HelpPanel;

// ==================== VOUCH MODAL ===================
const VouchModal = ({ 
  vouchModal, 
  setVouchModal, 
  orgData, 
  error, 
  setError, 
  handleVouch,
  formatTokenAmount,
  contractManager 
}: any) => {
  const [isHonorInput, setIsHonorInput] = useState(true);
  const [exchange, setExchange] = useState({ vouchIn: 0n, honor: 0n, vouchOut: 0n, fromHonorCurrent: 0n, toHonorCurrent: 0n  });
  const [loading, setLoading] = useState(false);
  const [currentHonor, setCurrentHonor] = useState(0n);
  const [exchangeError, setExchangeError] = useState('');
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    const calculateExchange = async () => {
      if (!vouchModal.fromArtifact || !vouchModal.toArtifact || !vouchModal.amount || vouchModal.amount === '0') {
        setExchange({ vouchIn: 0n, honor: 0n, vouchOut: 0n, fromHonorCurrent: 0n, toHonorCurrent: 0n  });
        setExchangeError('');
        return;
      }

      try {
        setLoading(true);
        setExchangeError('');

        const inputAmount = ethers.parseEther(vouchModal.amount);
        const fromContract = await contractManager.getArtifactContract(vouchModal.fromArtifact);
        const toContract = await contractManager.getArtifactContract(vouchModal.toArtifact);
        const sttContract = await contractManager.getSTTContract();

        const fromHonorCurrent = await fromContract.honorWithin();
        const toHonorCurrent = await toContract.honorWithin();

        if (isHonorInput) {
          // Honor input: honor → vouchIn, vouchOut unknown
          const vouchIn = await fromContract.vouchAmtPerHonor(inputAmount);

          const vouchOut = await sttContract.vouch.staticCall(
            vouchModal.fromArtifact,
            vouchModal.toArtifact,
            inputAmount, 
            true // isHonor = true
          );

          setExchange({
            vouchIn,
            honor: inputAmount,
            vouchOut, 
            fromHonorCurrent, toHonorCurrent
          });
        } else {
          // Vouch input: vouchIn → honor → vouchOut (full chain)
          const honor = await fromContract.honorAmtPerVouch(inputAmount);
          // const vouchOut = await toContract.vouchAmtPerHonor(honor);

          const vouchOut = await sttContract.vouch.staticCall(
            vouchModal.fromArtifact,
            vouchModal.toArtifact,
            inputAmount, 
            false // isHonor = false
          );
          setExchange({ 
            vouchIn: inputAmount,
            honor,
            vouchOut,
            fromHonorCurrent, toHonorCurrent
          });
        }
      } catch (error: unknown) {

        console.error('Error calculating exchange:', error);

        if (error instanceof Error) {
          if (error.message.includes('insufficient')) {
            setExchangeError('Insufficient balance in source artifact');
          } else if (error.message.includes('overflow')) {
            setExchangeError('Amount too large');
          } else {
            setExchangeError('Unable to calculate exchange. Check your inputs.');
          }
        }

        setExchange({ vouchIn: 0n, honor: 0n, vouchOut: 0n, fromHonorCurrent: 0n, toHonorCurrent: 0n });
      } finally {
        setLoading(false);
      }
    };

    calculateExchange();
  }, [vouchModal.amount, vouchModal.fromArtifact, vouchModal.toArtifact, isHonorInput, contractManager]);

  if (!vouchModal.isOpen || !orgData) return null;

  const userArtifacts = orgData.artifacts.filter((a: any) => orgData.userBalances[a.address] > 0n);
  
  // Calculate available rates 
  const canShowInputRate = exchange.vouchIn > 0n && exchange.honor > 0n;
  const canShowOutputRate = exchange.honor > 0n && exchange.vouchOut > 0n;

  const inputRate = canShowInputRate ?  Number(exchange.honor) / Number(exchange.vouchIn) : 0;
  const outputRate = canShowOutputRate ?  Number(exchange.honor) / Number(exchange.vouchOut) : 0;

  const fromArtifactName = orgData.artifacts.find((a:any) => a.address === vouchModal.fromArtifact)?.location || 'Unknown';
  const toArtifactName = orgData.artifacts.find((a:any) => a.address === vouchModal.toArtifact)?.location || 'Unknown';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-4 w-[500px] max-w-lg mx-4 max-h-[95vh] overflow-y-auto">
        <h3 className="text-xl font-bold mb-4">Vouch HONOR Tokens</h3>
        
        <div className="space-y-4">
          {/* Input Type Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setIsHonorInput(true)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                isHonorInput 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Honor Amount
            </button>
            <button
              onClick={() => setIsHonorInput(false)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                !isHonorInput 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Vouch Claims
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">From Artifact</label>
            <select 
              value={vouchModal.fromArtifact}
              onChange={(e) => setVouchModal((prev: any) => ({...prev, fromArtifact: e.target.value}))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select source artifact</option>
              {userArtifacts.map((artifact: any) => (
                <option key={artifact.address} value={artifact.address}>
                  {artifact.location} (Total: {
                    isHonorInput 
                      ? `${formatTokenAmount(artifact.honorWithin)} HONOR`
                      : `${formatTokenAmount(artifact.totalSupply)} vouch shares`
                  })
                </option> 
              ))}
              {/*
              {userArtifacts.map((artifact: any) => (
                <option key={artifact.address} value={artifact.address}>
                  {artifact.location} (Balance: {formatTokenAmount(orgData.userBalances[artifact.address])})
                </option>
              ))}*/}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">To Artifact</label>
            <select 
              value={vouchModal.toArtifact}
              onChange={(e) => setVouchModal((prev: any) => ({...prev, toArtifact: e.target.value}))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select destination artifact</option>
              {orgData.artifacts.filter((a: any) => a.address !== vouchModal.fromArtifact).map((artifact: any) => (
                <option key={artifact.address} value={artifact.address}>
                  {artifact.location} (Total: {
                    isHonorInput 
                      ? `${formatTokenAmount(artifact.honorWithin)} HONOR`
                      : `${formatTokenAmount(artifact.totalSupply)} vouch shares`
                  })
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount ({isHonorInput ? 'HONOR' : 'Vouch Shares'})
            </label>
            <input
              type="number"
              value={vouchModal.amount}
              onChange={(e) => setVouchModal((prev: any) => ({...prev, amount: e.target.value}))}
              placeholder={`Enter ${isHonorInput ? 'HONOR' : 'vouch'} amount`}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="1"
              step="1"
            />

{/*            {vouchModal.fromArtifact && orgData.userBalances[vouchModal.fromArtifact] && (
              <p className="text-sm text-gray-500 mt-1">
                Available: {formatTokenAmount(orgData.userBalances[vouchModal.fromArtifact])} Vouch claims
              </p>
            )}*/}
          </div>

          {/* Exchange Preview */}

          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg min-h-[360px]">
            {vouchModal.amount && vouchModal.fromArtifact && vouchModal.toArtifact ? ( 
              <div className="text-sm text-blue-800 space-y-1">
                <h4 className="font-semibold">Exchange Preview:</h4>
                
                {exchangeError ? (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-700 text-sm">{exchangeError}</p>
                  </div>
                ) : loading ? ( 
                  <div className="text-center py-2">Calculating...</div>
                ) : (
                  <>
                    {/* User's available balance */}
                    <div className="flex justify-between">
                      <span>Your available balance:</span>
                      <span>{formatTokenAmount(orgData.userBalances[vouchModal.fromArtifact] || 0n)} vouch shares in {fromArtifactName}</span>
                    </div>

                    {/* Cost in opposite unit from input */}
                    <div className="flex justify-between">
                      <span>Cost:</span>
                      <span className="font-medium">
                        {isHonorInput 
                          ? `${formatTokenAmount(exchange.vouchIn)} vouch shares in ${fromArtifactName}`
                          : `${formatTokenAmount(exchange.honor)} HONOR`
                        }
                      </span>
                    </div>

                    {/* Received in vouch claims */}
                    <div className="flex justify-between">
                      <span>Received:</span>
                      <span className="font-bold">{formatTokenAmount(exchange.vouchOut)} vouch shares in {toArtifactName}</span>
                    </div>

                    {/* Source and target rates */}
                    <div className="flex justify-between text-xs">
                      <span>Source HONOR price:</span>
                      <span>{inputRate.toFixed(4)} HONOR/share</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Target HONOR price:</span>
                      <span>{outputRate.toFixed(4)} HONOR/share</span>
                    </div>


                {/*                  <> 
                                    <div className="flex justify-between">
                                      <span>Honor value:</span>
                                      <span className="font-medium">{formatTokenAmount(exchange.honor || 0n)}</span>
                                    </div>
                 
                                    {canShowInputRate && (
                                      <>
                                        <div className="flex justify-between">
                                          <span>Vouch cost:</span>
                                          <span className="font-medium">{formatTokenAmount(exchange.vouchIn)} claims</span>
                                        </div>
                                        <div className="flex justify-between text-xs">
                                          <span>Input rate:</span>
                                          <span>{inputRate.toFixed(4)} honor/claims</span>
                                        </div>
                                      </>
                                    )}
                 
                                    {canShowOutputRate && (
                                      <>
                                        <hr className="border-blue-300"/>
                                        <div className="flex justify-between">
                                          <span>Vouch received:</span>
                                          <span className="font-bold">{formatTokenAmount(exchange.vouchOut)} claims</span>
                                        </div>
                                        <div className="flex justify-between text-xs">
                                          <span>Output rate:</span>
                                          <span>{outputRate.toFixed(4)} honor/claims</span>
                                        </div>
                                      </>
                                    )}

                    {isHonorInput ? (
                      <> 
                        {canShowInputRate && (
                          <div className="flex justify-between">
                            <span>Source cost:</span>
                            <span className="font-medium">{formatTokenAmount(exchange.honor)} HONOR equivalent</span>
                          </div>
                        )}
 
                        {canShowOutputRate && (
                          <div className="flex justify-between">
                            <span>Target received:</span>
                            <span className="font-bold">{formatTokenAmount(BigInt(Math.round(Number(exchange.vouchOut) / outputRate)))} HONOR equivalent</span>
                          </div>
                        )}
                      </>
                    ) : (
                    // Vouch mode - similar structure but showing vouch claims
                    <>
                      <div className="flex justify-between">
                        <span>Honor value:</span>
                        <span className="font-medium">{formatTokenAmount(exchange.honor)} HONOR</span>
                      </div>
                      
                      {canShowInputRate && (
                        <div className="flex justify-between">
                          <span>Vouch cost:</span>
                          <span className="font-medium">{formatTokenAmount(exchange.vouchIn)} claims</span>
                        </div>
                      )}
                      
                      {canShowOutputRate && (
                        <div className="flex justify-between">
                          <span>Vouch received:</span>
                          <span className="font-bold">{formatTokenAmount(exchange.vouchOut)} claims</span>
                        </div>
                      )}
                    </>
                  )}*/}

                    {exchange.honor > 0n && exchange.fromHonorCurrent > 0n && exchange.toHonorCurrent > 0n && ( 
                      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg"> 
                        <div className="flex space-x-2">
                          <> 
                          <MiniCurve 
                            honorCurrent={Number(exchange.fromHonorCurrent)}
                            honorFuture={Number(exchange.fromHonorCurrent) - Number(exchange.honor)}
                            isFromArtifact={true}
                            width={200}
                            height={150}
                            zoomLevel={zoomLevel}
                          />
                          <MiniCurve 
                            honorCurrent={Number(exchange.toHonorCurrent)}
                            honorFuture={Number(exchange.toHonorCurrent) + Number(exchange.honor)}
                            isFromArtifact={false}
                            width={200}
                            height={150}
                            zoomLevel={zoomLevel}
                          />
                          </>
                        </div>
                      </div>
                    )} 
                      <div className="flex justify-center space-x-2 mt-2">
                        <button onClick={() => setZoomLevel(Math.max(0.5, zoomLevel * 0.5))} className="text-xs px-2 py-1 bg-gray-200 rounded">
                          Zoom In
                        </button>
                        <span className="text-xs self-center">{zoomLevel.toFixed(1)}x</span>
                        <button onClick={() => setZoomLevel(Math.min(100, zoomLevel * 2))} className="text-xs px-2 py-1 bg-gray-200 rounded">
                          Zoom Out
                        </button>
                      </div>
                  </>
                )}
              </div>
          ) : (
            <div className="text-sm text-gray-500 text-center py-8">
              Select artifacts and enter amount to see preview
            </div>
          )}
        </div>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <div className="flex space-x-3 mt-6">
          <button
            onClick={() => {
              setVouchModal((prev: any) => ({ ...prev, isOpen: false, fromArtifact: '', toArtifact: '', amount: '' }));
              setError('');
            }}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleVouch}
            disabled={!vouchModal.fromArtifact || !vouchModal.toArtifact || !vouchModal.amount || loading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Execute Vouch
          </button>
        </div>
      </div>
    </div>
  );
};

// ==================== MAIN COMPONENT ====================

export default function Web3ReputationDashboard() {
  // ==================== STATE MANAGEMENT ====================
  
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [currentAccount, setCurrentAccount] = useState<string>('');
  const [currentNetwork, setCurrentNetwork] = useState<string>('');
  const [orgData, setOrgData] = useState<OrganizationData | null>(null);
  const [selectedArtifact, setSelectedArtifact] = useState<Artifact | null>(null);
  const [viewMode, setViewMode] = useState<'total' | 'user'>('total');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [contractManager, setContractManager] = useState<ContractManager | null>(null);
  const [contractOwner, setContractOwner] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [vouchModal, setVouchModal] = useState({
    isOpen: false,
    fromArtifact: '',
    toArtifact: '',
    amount: ''
  });
  const [generateModal, setGenerateModal] = useState({
    isOpen: false,
    fromAddress: '',
    builderAddress: '',
    location: '',
    shouldValidate: true
  });
  const [fromAddress, setFromAddress] = useState('');
  const [builderAddress, setBuilderAddress] = useState('');
  const [rootArtifactAddress, setRootArtifactAddress] = useState(null);
  const [location, setLocation] = useState('');
  const [shouldValidate, setShouldValidate] = useState(false);
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [showOrgSelector, setShowOrgSelector] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState('');
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);


  const handleSelectOrganization = async (address: string, 
    network?: string,
    providerOverride?: any,
    signerOverride?: any,
    userOverride?: any
    ) => {
    try {
      // Use the provider/signer from state (set by connectWallet)
      const activeNetwork = network || currentNetwork;
      const currentNetworkConfig = NETWORK_CONFIGS[activeNetwork]; 

      const activeProvider = providerOverride || provider;
      const activeSigner = signerOverride || signer;
      const currUser = userOverride || currentAccount;

      const orgNetworkConfig = {
        ...currentNetworkConfig,
        contracts: {
          ...currentNetworkConfig.contracts,
          stt: address  // Selected org address
        }
      };

      if (currentNetworkConfig.contracts.honorFactory == "") {
        console.log('No factory on this network, loading org directly');
        // Skip org selector entirely, go straight to loading this specific org
        setShowOrgSelector(false);
      }
      
      // CREATE the ContractManager here
      const orgManager = new ContractManager(activeProvider, activeSigner, orgNetworkConfig);

      // Test it works
      const testContract = await orgManager.getSTTContract();
      await testContract.totalSupply();
      
      // Set it in state
      setContractManager(orgManager);
      setSelectedOrg(address);
      setOrgData(null);

      // Load org data
      await loadOrganizationData(orgManager, currUser);
      
    } catch (error) {
      console.error('Failed to load organization:', error);
      setError('Could not load organization at this address');
      setShowOrgSelector(true);
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const orgAddress = urlParams.get('org');
      
      // Only handle if there's no org AND we currently have an org selected
      if (!orgAddress && selectedOrg) {
        setShowOrgSelector(true);
        setContractManager(null);
        setSelectedOrg('');
      } else if (orgAddress && orgAddress !== selectedOrg) {
        // Handle forward navigation to a different org
        handleSelectOrganization(orgAddress);
      }
    };
    
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [selectedOrg]);

  // ==================== WALLET CONNECTION ====================

  const connectWallet = async (): Promise<void> => {
    // await window.ethereum.request({
    //   method: 'wallet_switchEthereumChain',
    //   params: [{ chainId: '0x1' }], // Switch away
    // });
    // await window.ethereum.request({
    //   method: 'wallet_switchEthereumChain', 
    //   params: [{ chainId: '0x7a69' }], // Switch back to 31337
    // });

    try {
      setError('');
      setIsLoading(true);

      if (typeof window.ethereum === 'undefined' || typeof (window as any).ethers === 'undefined') {
        console.log('🎭 Ethers or Metamask not found - using mock mode for development');
        const mockNetworkConfig = NETWORK_CONFIGS.localhost;
        const mockManager = new ContractManager(null, null, mockNetworkConfig);
        
        console.log('ENTERING MOCK MODE');

        setIsConnected(true);
        setCurrentAccount('0x1234567890123456789012345678901234567890'); // Mock account
        setCurrentNetwork('localhost');
        setContractManager(mockManager);
        
        await loadOrganizationData(mockManager, '0x1234567890123456789012345678901234567890');
        return;
      }

      if (window.ethereum.selectedAddress) {
        console.log('Existing connection detected, disconnecting...');
        // Some wallets support explicit disconnect
        if (window.ethereum.disconnect) {
          await window.ethereum.disconnect();
        }
      }
      
      // Request accounts - this should force MM to show connection popup
      const accounts_new = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });

      // Request network switch to localhost first
      // console.log('🔗 Requesting network switch...');
      // try {
      //   await window.ethereum.request({
      //     method: 'wallet_switchEthereumChain',
      //     params: [{ chainId: '0x7a69' }], // 31337 in hex
      //   });
      //   console.log('✅ Network switch successful');
      // } catch (switchError: any) {
      //   console.log('⚠️ Network switch failed:', switchError);
      //   if (switchError.code === 4902) {
      //     throw new Error('Please add the Hardhat Local network to MetaMask');
      //   }
      //   // Continue anyway - maybe user is already on right network
      //   console.log('🔄 Continuing despite network switch failure...');
      // }

      // console.log('🔗 Requesting network switch...');
      // try {
      //   await window.ethereum.request({
      //     method: 'wallet_switchEthereumChain',
      //     params: [{ chainId: '0xa' }], // 10 in hex
      //   });
      //   console.log('✅ Network switch successful');
      // } catch (switchError: any) {
      //   console.log('⚠️ Network switch failed:', switchError);
      //   if (switchError.code === 4902) {
      //     throw new Error('Please add the Hardhat Local network to MetaMask');
      //   }
      //   // Continue anyway - maybe user is already on right network
      //   console.log('🔄 Continuing despite network switch failure...');
      // }

      // Create provider AFTER network switch
      const getNetworkName = (chainId: any) => {
        switch (chainId.toString()) {
          case '1': return 'mainnet';
          case '10': return 'optimism';
          case '31337': return 'localhost';
          case '42161': return 'arbitrum';
          case '137': return 'polygon';
          default: throw new Error(`Unsupported network: ${chainId}`);
        }
      }; 

      const chainIdHex = await window.ethereum.request({ method: 'eth_chainId' });
      console.log('MetaMask reports chainId (hex):', chainIdHex);


      console.log('🌐 Creating provider...');
      const provider = new (window as any).ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner(); 

      // const nnn = await provider.getNetwork();
      
      // console.log('Raw network object:', nnn);
      // console.log('Network chainId:', nnn.chainId.toString());
      // console.log('Network name from provider:', nnn.name);

      console.log('👤 Requesting accounts...');
      const accounts = await provider.send("eth_requestAccounts", []);
      
      if (accounts.length === 0) {
        throw new Error('No accounts found. Please connect an account in MetaMask.');
      }
      console.log('✅ Got accounts:', accounts);


      // Check network but don't fail if it's wrong - just warn
      // console.log('🔍 Checking network...');
      // try {
      //   const network = await provider.getNetwork();
      //   const expectedNetwork = NETWORK_CONFIGS.localhost;
      //   console.log('📡 Current network:', network.chainId, 'Expected:', expectedNetwork.chainId);
        
      //   if (network.chainId !== expectedNetwork.chainId) {
      //     console.warn(
      //       `⚠️ Network mismatch! Expected ${expectedNetwork.name} (${expectedNetwork.chainId}), ` +
      //       `but connected to ${network.name} (${network.chainId}).`
      //     );
      //     // Don't throw error - just set a warning
      //     setError(`Warning: Connected to ${network.name} instead of ${expectedNetwork.name}`);
      //   }
      // } catch (networkError) {
      //   console.warn('⚠️ Network check failed:', networkError);
      // }

      const currentUser = await signer.getAddress();
      setIsConnected(true);
      setCurrentAccount(currentUser);
      const network = await provider.getNetwork();
      const networkName = getNetworkName(network.chainId);
      const networkConfig = NETWORK_CONFIGS[networkName];


      if (!networkConfig) {
        throw new Error(`No configuration found for network: ${networkName}`);
      }
    
      console.log('Detected network name:', networkName);
      setCurrentNetwork(networkName);

      // ... existing wallet connection logic ...
      // ... create provider, signer ...
      
      // Store provider/signer in state but don't create ContractManager yet
      setProvider(provider);
      setSigner(signer);  

      // Check URL for org parameter
      const urlParams = new URLSearchParams(window.location.search);
      const orgAddress = urlParams.get('org');

      if (orgAddress && ethers.isAddress(orgAddress)) {
        await handleSelectOrganization(orgAddress, networkName, provider, signer, currentUser);
      }


      // If no valid org in URL, render logic will show OrganizationSelector
      
    } catch (error: any) {
      console.error('❌ Error connecting wallet:', error);
      setError(error.message || 'Failed to connect wallet');
      setIsConnected(false);
    } finally {
      setIsLoading(false);
    }

  };


  const disconnectWallet = (): void => {
    setIsConnected(false);
    setCurrentAccount('');
    setOrgData(null);
    setSelectedArtifact(null);
    setContractManager(null);
    setContractOwner('');
    setError('');
    setProvider(null);           
    setSigner(null);            
    setSelectedOrg('');          
    setShowOrgSelector(false);   
  };

  // ==================== DATA LOADING ====================
  
  const loadOrganizationData = async (manager?: ContractManager, account?: string, orgAddress?: string): Promise<void> => {
    const activeManager = manager || contractManager;
    const activeAccount = account || currentAccount;
    setOrgData(null);

    if (!activeManager || !activeAccount) {
      setError('Contract manager or account not available for ' + activeAccount);
      return;
    }

    // Validate org address if provided
    if (orgAddress && !ethers.isAddress(orgAddress)) {
      setError('Invalid organization address');
      return;
    }

    // If orgAddress is provided, create new manager with that org
    // let finalManager = activeManager;
    // if (orgAddress && orgAddress !== activeManager.networkConfig.contracts.stt) {
    //   try {
    //     const orgNetworkConfig = {
    //       ...activeManager.networkConfig,
    //       contracts: {
    //         ...activeManager.networkConfig.contracts,
    //         stt: orgAddress
    //       }
    //     };
    //     finalManager = new ContractManager(provider, signer, orgNetworkConfig);
        
    //     // Test the contract exists and is valid before updating state
    //     const testContract = await finalManager.getSTTContract();
    //     await testContract.totalSupply(); // Simple call to verify it's a real contract
        
    //     setContractManager(finalManager);
    //   } catch (error) {
    //     setError('Invalid organization contract - contract may not exist or be deployed');
    //     return;
    //   }
    // }

    setIsLoading(true);
    setError('');

    try {
      const networkConfig = activeManager.networkConfig; //NETWORK_CONFIGS[currentNetwork];
      if (!networkConfig) {
        throw new Error(`No configuration found for network: ${currentNetwork}`);
      }

      // await window.ethereum.request({
      //   method: 'wallet_switchEthereumChain',
      //   params: [{ chainId: '0x1' }], // Switch to mainnet
      // });
      // await window.ethereum.request({
      //   method: 'wallet_switchEthereumChain', 
      //   params: [{ chainId: '0x7a69' }], // Switch back to hardhat
      // });

      const sttContract = await activeManager.getSTTContract();
      console.log('✅ Got STT contract:', !!sttContract);

      // // Load basic contract data

      const sttAddress = await activeManager.getSTTContract().then(c => c.getAddress());
      // console.log('About to call getAllArtifacts on STT contract:', sttAddress);
      // console.log('Expected org address:', selectedOrg);
      // console.log('passed in: ', orgAddress);
      // console.log('Are they the same?', sttAddress === selectedOrg);

      const [artifactAddresses, totalSupply, owner] = await Promise.all([
        sttContract.getAllArtifacts({ blockTag: 'latest' }),
        sttContract.totalSupply({ blockTag: 'latest' }),
        sttContract.owner({ blockTag: 'latest' })
      ]);

      const validArtifacts = [];
      for (const address of artifactAddresses) {
        try {
          const artifactContract = await activeManager.getArtifactContract(address);
          // Check if this artifact belongs to this STT contract
          const artifactSTT = await artifactContract.honorAddr(); // or however you check ownership
          if (artifactSTT === sttContract.target) {
            validArtifacts.push(address);
          }
        } catch (error) {
          // Skip invalid artifacts
          console.warn('Invalid artifact:', address);
        }
      }
 
      setContractOwner(owner);
 
      // Load artifact data
      const artifacts: Artifact[] = await Promise.all(
        validArtifacts.map(async (address: string) => {
          const artifactContract = await activeManager.getArtifactContract(address);
          // const artifactContract = new ethers.Contract(address, ARTIFACT_ABI, directProvider);
          
          const [
            location,
            isValidated,
            honorWithin,
            builder,
            totalSupply,
            accHonorHours,
            honorAmtPerVouch,
            userBalance
          ] = await Promise.all([
            artifactContract.location(),
            artifactContract.isValidated(),
            artifactContract.honorWithin(),
            artifactContract.builder(),
            artifactContract.totalSupply(),
            artifactContract.accHonorHours(),
            artifactContract.honorAmtPerVouch(1000000000000000000n),
            artifactContract.balanceOf(activeAccount)
          ]);

          return {
            address,
            location,
            isValidated,
            balance: honorWithin,
            honorWithin,
            builder,
            honorAmtPerVouch,
            totalSupply,
            accHonorHours,
            userBalance
          };
        })
      );

      // Build user balances object
      const userBalances: { [address: string]: bigint } = {};
      artifacts.forEach(artifact => {
        userBalances[artifact.address] = artifact.userBalance;
      });

      const organizationData: OrganizationData = {
        artifacts: artifacts.sort((a, b) => Number(b.balance - a.balance)),
        totalSupply,
        userBalances,
        contractAddress: networkConfig.contracts.stt,
        name: sttContract.name(),
        description: ''
      };

      setOrgData(organizationData);

      setSelectedArtifact(organizationData.artifacts[0] || null);
      const rootAddress = await sttContract.rootArtifact(); 
      setRootArtifactAddress(rootAddress);

    } catch (error: any) {
      console.error('Error loading organization data:', error);
      setError(error.message || 'Failed to load organization data');
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    if (!window.ethereum) return;
    
    const handleChainChanged = async (chainIdHex: any) => {
      try {
        await window.ethereum.request({
          method: 'wallet_revokePermissions',
          params: [{ eth_accounts: {} }]
        });
        console.log('Revoked existing permissions');
      } catch (e) {
        console.log('No permissions to revoke or method not supported');
      }
        
      console.log('Chain changed event fired:', chainIdHex);
      const newChainId = parseInt(chainIdHex, 16);
      console.log('New chainId:', newChainId);
      
      // Clear existing connection state
      setContractManager(null);
      setSelectedOrg('');
      setOrgData(null);
      
      // Reconnect with new network
      await connectWallet();
    };

    window.ethereum.on('chainChanged', handleChainChanged);
    
    return () => {
      window.ethereum.removeListener('chainChanged', handleChainChanged);
    };
  }, []);


  // ==================== ARTIFACT GENERATION FUNCTIONALITY ====================
  
  const handleGenerateArtifact = async (): Promise<void> => {
    if (!contractManager || !fromAddress || !builderAddress || !location) {
      setError('Please fill in all generation fields');
      return;
    }

    try {
      setError('');
      
      const sttContract = await contractManager.getSTTContract();
      
      const newArtifactAddress = await sttContract.proposeArtifact.staticCall(
        fromAddress,
        builderAddress, 
        location,
        shouldValidate
      ); 

      // Execute proposeArtifact transaction
      const tx = await contractManager.proposeArtifact(
        fromAddress,
        builderAddress,
        location,
        shouldValidate
      );
      await tx.wait();
      await new Promise(resolve => setTimeout(resolve, 500)); 

      const artifactContract: any = await contractManager.getArtifactContract(newArtifactAddress);

      const [
        loc,
        isValidated,
        honorWithin,
        builder,
        totalSupply,
        accHonorHours,
        honorAmtPerVouch, 
      ] = await Promise.all([
        artifactContract.location(),
        artifactContract.isValidated(),
        artifactContract.honorWithin(),
        artifactContract.builder(),
        artifactContract.totalSupply(),
        artifactContract.accHonorHours(),
        artifactContract.honorAmtPerVouch(1n), 
      ]);


      try {
        // Add the new artifact to existing state instead of full reload
        const newArtifact = {
          address: newArtifactAddress,
          loc,
          isValidated,
          balance: honorWithin, // assuming this is correct
          honorWithin,
          builder,
          honorAmtPerVouch,
          totalSupply,
          accHonorHours,
          userBalance: totalSupply
        };
        
        setOrgData(prev => {
          if (!prev) return prev;
          
          return {
            ...prev,
            artifacts: [...prev.artifacts, newArtifact]
          } as OrganizationData;
        });

          
      } catch (error) {
        // Only reload on error
        await loadOrganizationData();
      }

      // console.log('ProposeArtifact transaction:', tx);
      

      // Refresh data after transaction
      // await loadOrganizationData();
      
      setFromAddress('');
      setBuilderAddress('');
      setLocation('');
      setShouldValidate(false);
      setIsGenerateModalOpen(false);

      // Close modal and reset form
      // setGenerateModal({ 
      //   isOpen: false, 
      //   fromAddress: '', 
      //   builderAddress: '', 
      //   location: '', 
      //   shouldValidate: true 
      // });
      
    } catch (error: any) {
      console.error('Error generating artifact:', error);
      setError(error.message || 'Artifact generation failed. Please try again.');
    }
  };

  // ==================== VOUCHING FUNCTIONALITY ====================
  
  const handleVouch = async (): Promise<void> => {
    if (!contractManager || !vouchModal.fromArtifact || !vouchModal.toArtifact || !vouchModal.amount) {
      setError('Please fill in all vouch fields');
      return;
    }

    try {
      setError('');
      const amount = BigInt(vouchModal.amount) * 1000000000000000000n;
      
      if (amount <= 0n) {
        throw new Error('Vouch amount must be greater than 0');
      }

      // const sttContract = await contractManager.getSTTContract();

      // const tx = await sttContract.vouch(
      //   vouchModal.fromArtifact,
      //   vouchModal.toArtifact,
      //   amount,
      //   true // isHonor flag
      // );

      const tx = await contractManager.vouchArtifact(
        vouchModal.fromArtifact,
        vouchModal.toArtifact,
        amount,
        true
      );
      await tx.wait();
      
      console.log('Vouch transaction:', tx);
      
      // Refresh data after transaction
      await loadOrganizationData();
      
      // Close modal and reset form
      // setVouchModal({ isOpen: false, fromArtifact: '', toArtifact: '', amount: '' });
      setVouchModal(prev => ({ 
        ...prev, 
        isOpen: false, 
        fromArtifact: '', 
        toArtifact: '', 
        amount: '' 
      }));

    } catch (error: any) {
      console.error('Error executing vouch:', error);
      setError(error.message || 'Transaction failed. Please try again.');
    }
  };

  // ==================== CALCULATED VALUES ====================
  
  const calculateUserTotalValue = (artifacts: any) => {
    return artifacts.reduce((total: number, artifact: any) => {
      if (artifact.totalSupply === 0n) return total; // Avoid division by zero
      
      const userBalance = artifact.userBalance || 0n;
      const proportionalHonor = (userBalance * artifact.honorWithin) / artifact.totalSupply;
      
      return total + proportionalHonor;
    }, 0n);
  };

  // // Usage:
  // const userTotalValue = calculateUserTotalValue(orgData.artifacts, activeAccount);

  const getDisplayData = () => {
    if (!orgData) return { sortedArtifacts: [], totalSupply: 0n, getBalance: () => 0n, maxBalance: 0n };
    // console.log('artifacts addresses:', orgData.artifacts.map(a => a.address));


    if (viewMode === 'user') {
      // const userTotal = Object.values(orgData.userBalances).reduce((sum, balance) => sum + balance, 0n);
      const userTotal = calculateUserTotalValue(orgData.artifacts);
      const userArtifacts = orgData.artifacts.filter(artifact => orgData.userBalances[artifact.address] > 0n);

      return {
        sortedArtifacts: userArtifacts.sort((a, b) => Number(orgData.userBalances[b.address] - orgData.userBalances[a.address])),
        totalSupply: userTotal,
        getBalance: (artifact: Artifact) => orgData.userBalances[artifact.address] || 0n,
        maxBalance: Math.max(...userArtifacts.map(a => Number(orgData.userBalances[a.address] || 0n)))
      };
    } else {
      return {
        sortedArtifacts: orgData.artifacts,
        totalSupply: orgData.totalSupply,
        getBalance: (artifact: Artifact) => artifact.balance,
        maxBalance: Math.max(...orgData.artifacts.map(a => Number(a.balance)))
      };
    }
  };

  // ==================== RENDER COMPONENTS ====================

  const WalletHeader = () => (
    <header className="bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 text-white p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Award className="w-8 h-8 text-yellow-400" />
          <h1 className="text-2xl font-bold">Honor Code</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          {isConnected ? (
            <>
              <div className="flex items-center space-x-2 bg-green-600 px-3 py-1 rounded-lg">
                <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                <span className="text-sm">{formatAddress(currentAccount)}</span>
              </div>
              <div className="flex items-center space-x-1 bg-blue-600 px-3 py-1 rounded-lg">
                <Globe className="w-4 h-4" />
                <span className="text-sm">{NETWORK_CONFIGS[currentNetwork]?.name || currentNetwork}</span>
              </div>
              <button
                onClick={disconnectWallet}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
              >
                Disconnect
              </button>
            </>
          ) : (
            <button
              onClick={connectWallet}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors disabled:opacity-50"
            >
              <Wallet className="w-5 h-5" />
              <span>{isLoading ? 'Connecting...' : 'Connect Wallet'}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );

  const ErrorBanner = () => {
    if (!error) return null;

    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-red-800">Connection Error</h3>
            <p className="text-red-700 text-sm mt-1">{error}</p>
          </div>
        </div>
      </div>
    );
  };

  const DashboardContent = () => {
    if (!isConnected) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
          <div className="text-center text-white max-w-2xl mx-4">
            <Award className="w-24 h-24 mx-auto mb-6 text-yellow-400" />
            <h2 className="text-4xl font-bold mb-4">Welcome to Honor Code</h2>
            <p className="text-xl mb-8 text-gray-300">
              Track contributions and manage HONOR tokens across your organization's artifacts
            </p>
            <div className="bg-gray-800 bg-opacity-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-4">Key Features:</h3>
              <ul className="text-left space-y-2 text-gray-300">
                <li>• Monitor artifact reputation in real-time</li>
                <li>• Vouch HONOR tokens between artifacts</li>
                <li>• Generate new artifacts with proposeArtifact</li>
                <li>• Visualize contribution impact with precise BigInt handling</li>
                <li>• Network validation prevents silent failures</li>
              </ul>
            </div>
          </div>
        </div>
      );
    }

    if (isLoading && !orgData) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <RefreshCw className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading organization data...</p>
          </div>
        </div>
      );
    }

    if (!orgData) {
      return (
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-7xl mx-auto p-6">
            <ErrorBanner />
            <div className="text-center py-12">
              <AlertTriangle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Organization Data</h3>
              <p className="text-gray-600 mb-4">Unable to load organization data. Please check your connection and try again.</p>
              <button
                onClick={() => loadOrganizationData()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      );
    }

    const displayData = getDisplayData();

    const rootArtifact = rootArtifactAddress && orgData
      ? orgData.artifacts.find(a => a.address === rootArtifactAddress)
      : null;

    const maxBalanceForBars = viewMode === 'user' 
      ? displayData.maxBalance // includes root
      : Math.max( // excludes root
          ...displayData.sortedArtifacts
            .filter(a => a.address !== rootArtifactAddress)
            .map(a => Number(displayData.getBalance(a)))
        );

    const getBarColor = (percentage: number) => {
      // Easy to alter thresholds
      const COPPER_LIGHT = 0.02;
      const COPPER_HEAVY = 0.05;
      const COPPER_SILVER = 0.08;
      const SILVER_COPPER = 0.12;
      const SILVER_LIGHT = 0.25;
      const SILVER_DARK = 0.5;
      const SILVER_GOLD = 1.0;
      const GOLD_SILVER = 1.5;
      const GOLD_LIGHT = 2.0;
      // GOLD_HEAVY = above 2.0
      
      // 10 defined colors
      const colors = {
        lightCopper: 'bg-orange-500 shadow-inner border border-orange-400',
        heavyCopper: 'bg-orange-700 shadow-inner border border-orange-600',
        copperSilver: 'bg-orange-800 shadow-inner border border-orange-700',
        silverCopper: 'bg-slate-500 shadow-inner border border-slate-400',
        lightSilver: 'bg-gray-500 shadow-inner border border-gray-400',
        darkSilver: 'bg-gray-600 shadow-inner border border-gray-500',
        silverGold: 'bg-stone-400  border-2 border-amber-300 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:animate-pulse',
        heavyGold: 'bg-amber-500 shadow-xl shadow-yellow-400/60 border-2 border-amber-400 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-yellow-200/40 before:to-transparent before:animate-pulse',
        lightGold: 'bg-yellow-500 shadow-2xl shadow-yellow-300/80 border-2 border-yellow-400 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-yellow-100/50 before:to-transparent before:animate-pulse',        
        goldSilver: 'bg-yellow-600 shadow-2xl shadow-yellow-200 border-3 border-yellow-500 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:animate-pulse'
      };

      if (percentage < COPPER_LIGHT) return colors.lightCopper;
      if (percentage < COPPER_HEAVY) return colors.heavyCopper;
      if (percentage < COPPER_SILVER) return colors.copperSilver;
      if (percentage < SILVER_COPPER) return colors.silverCopper;
      if (percentage < SILVER_LIGHT) return colors.lightSilver;
      if (percentage < SILVER_DARK) return colors.darkSilver;
      if (percentage < SILVER_GOLD) return colors.silverGold;
      if (percentage < GOLD_SILVER) return colors.goldSilver;
      if (percentage < GOLD_LIGHT) return colors.lightGold;
      return colors.heavyGold;
    };

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto p-6">
          <ErrorBanner />
          
          {/* Organization Overview */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{orgData.name}</h2>
                <p className="text-gray-600">{orgData.description}</p>
                <p className="text-sm text-gray-500 mt-1">Contract: {formatAddress(orgData.contractAddress)}</p>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setIsGenerateModalOpen(true)}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                >
                  <Target className="w-4 h-4" />
                  <span>Generate Artifact</span>
                </button>
                
                <button
                  onClick={() => loadOrganizationData()}
                  disabled={isLoading}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                  <span>Refresh</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100">Total Supply</p>
                    <p className="text-3xl font-bold">{formatTokenAmount(orgData.totalSupply)}</p>
                    <p className="text-xs text-blue-200 mt-1">HONOR Tokens</p>
                  </div>
                  <Target className="w-12 h-12 text-blue-200" />
                </div>
              </div>
              
{/*              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100">Active Artifacts</p>
                    <p className="text-3xl font-bold">{orgData.artifacts.length}</p>
                  </div>
                  <Users className="w-12 h-12 text-green-200" />
                </div>
              </div>*/}

              <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100">Your Total HONOR</p>
                    <p className="text-3xl font-bold">
                      {formatTokenAmount(calculateUserTotalValue(orgData.artifacts))} 
                    </p>
                  </div>
                  <BarChart3 className="w-12 h-12 text-purple-200" />
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100">Validated Artifacts</p>
                    <p className="text-3xl font-bold">
                      {orgData.artifacts.filter(a => a.isValidated).length}
                    </p>
                  </div>
                  <TrendingUp className="w-12 h-12 text-orange-200" />
                </div>
              </div>
            </div>
          </div>

          {/* Artifacts Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Artifact Overview</h3>
                  <div className="flex items-center space-x-4">
                    <div className="flex bg-gray-100 rounded-lg p-1">
                      <button
                        onClick={() => setViewMode('total')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                          viewMode === 'total' 
                            ? 'bg-white text-blue-600 shadow-sm' 
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        Total HONOR
                      </button>
                      <button
                        onClick={() => setViewMode('user')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                          viewMode === 'user' 
                            ? 'bg-white text-blue-600 shadow-sm' 
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        Your Holdings
                      </button>
                    </div>
                    
                    <button
                      onClick={() => setVouchModal({ ...vouchModal, isOpen: true })}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                    >
                      <ArrowRightLeft className="w-4 h-4" />
                      <span>Vouch HONOR</span>
                    </button>
                  </div>
                </div>
      
                {rootArtifact && (
                  <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-semibold text-blue-900">Root Artifact</h3>
                        <p className="text-sm text-blue-700">{rootArtifact.location}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-900">
                          {formatTokenAmount(displayData.getBalance(rootArtifact))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  {displayData.sortedArtifacts.length === 0 || rootArtifact == null ? (
                    <div className="text-center py-8 text-gray-500">
                      <Award className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                      <p>{viewMode === 'user' ? "You don't hold any HONOR tokens yet" : "No artifacts found"}</p>
                    </div>
                  ) : (
                    displayData.sortedArtifacts.filter(artifact => artifact.address !== rootArtifactAddress).slice(0, 8).map((artifact) => {
                      const balance = displayData.getBalance(artifact);
{/*                      const percentage = artifact.totalSupply > 0n 
                        ? Number(Number(balance * 1000000n) / Number(artifact.totalSupply)) / 10000
                        : 0;*/}
                      const percentage = viewMode === 'user' 
                        ? (artifact.totalSupply > 0n 
                           ? Number(Number(orgData.userBalances[artifact.address] * 1000000n) / Number(artifact.totalSupply)) / 10000
                           : 0) // User's share of artifact
                        : (displayData.totalSupply > 0n
                           ? Number(Number(balance * 1000000n) / Number(displayData.totalSupply)) / 10000  
                           : 0); 

                      const colorBalance = artifact.honorWithin; // Always the same for colors
                      const colorPercentage = displayData.totalSupply > 0n
                        ? Number(Number(colorBalance * 1000000n) / Number(displayData.totalSupply)) / 10000  
                        : 0;

                      const barWidth = displayData.maxBalance > 0 
                        ? Math.max(Number(balance) / Number(maxBalanceForBars) * 100, 2)
                        : 2;
                      const isSelected = selectedArtifact?.address === artifact.address;
                      
                      return (
                        <div 
                          key={artifact.address}
                          onClick={() => setSelectedArtifact(artifact)}
                          className={`p-3 rounded-lg cursor-pointer transition-all ${
                            isSelected ? 'bg-blue-50 border-2 border-blue-200' : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                          }`}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center space-x-2">
                              <div className={`w-3 h-3 rounded-full ${
                                artifact.isValidated ? 'bg-green-500' : 'bg-yellow-500'
                              }`}></div>
                              <span className="font-medium text-gray-900">{artifact.location}</span>
                              {viewMode === 'user' && (
                                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                  Your shares
                                </span>
                              )}
                            </div>
                            <div className="text-right">
                              <span className={`font-bold ${viewMode === 'user' ? 'text-green-600' : 'text-blue-600'}`}>
                                {formatTokenAmount(balance)}
                              </span>
                              <span className="text-sm text-gray-500 ml-1">
                                ({percentage.toFixed(2)}%)
                              </span>
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
{/*                            <div 
                              className={`h-2 rounded-full transition-all duration-300 ${
                                viewMode === 'user'
                                  ? 'bg-gradient-to-r from-green-500 to-green-600'
                                  : artifact.isValidated 
                                    ? 'bg-gradient-to-r from-blue-500 to-blue-600' 
                                    : 'bg-gradient-to-r from-yellow-400 to-yellow-500'
                              }`}
                              style={{ width: `${barWidth}%` }}
                            ></div>*/}

                            <div className={`h-8 rounded-lg transition-all duration-300 flex items-center px-3 ${getBarColor(colorPercentage)}`}
                              style={{ width: `${barWidth}%` }}
                            >
                              <span className="text-white text-sm font-medium truncate">
                                {formatTokenAmount(balance)} ({percentage.toFixed(2)}%)
                              </span>
                            </div> 
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
                
                {displayData.sortedArtifacts.length > 8 && (
                  <div className="mt-3 text-center">
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      View all {displayData.sortedArtifacts.length} {viewMode === 'user' ? 'holdings' : 'artifacts'}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Artifact Details Panel */}
            <div className="lg:col-span-1">
              {selectedArtifact ? (
                <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      selectedArtifact.isValidated ? 'bg-green-100' : 'bg-yellow-100'
                    }`}>
                      <Award className={`w-6 h-6 ${selectedArtifact.isValidated ? 'text-green-600' : 'text-yellow-600'}`} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{selectedArtifact.location}</h4>
                      <p className="text-sm text-gray-500">Artifact Details</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
                      <p className="text-sm text-blue-600 font-medium">HONOR Balance</p>
                      <p className="text-2xl font-bold text-blue-800">{formatTokenAmount(selectedArtifact.balance)}</p>
                      <p className="text-sm text-blue-600">
                        {orgData.totalSupply > 0n 
                          ? `${(Number((selectedArtifact.balance * 10000n) / orgData.totalSupply) / 100).toFixed(2)}% of total supply`
                          : '0% of total supply'
                        }
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-4 rounded-lg">
                      <p className="text-sm text-yellow-600 font-medium">Vouch Price</p>
                      <p className="text-2xl font-bold text-yellow-800">{(formatTokenAmount(selectedArtifact.honorAmtPerVouch))}</p>
                      <p className="text-sm text-yellow-600">HONOR per share</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-green-50 p-3 rounded-lg">
                        <p className="text-xs text-green-600 font-medium">Your Balance</p>
                        <p className="text-lg font-bold text-green-800">
                          {formatTokenAmount(orgData.userBalances[selectedArtifact.address] || 0n)}
                        </p>
                      </div>
                      <div className="bg-purple-50 p-3 rounded-lg">
                        <p className="text-xs text-purple-600 font-medium">Total Supply</p>
                        <p className="text-lg font-bold text-purple-800">{formatTokenAmount(selectedArtifact.totalSupply)}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Status</span>
                        <span className={`text-sm font-medium ${
                          selectedArtifact.isValidated ? 'text-green-600' : 'text-yellow-600'
                        }`}>
                          {selectedArtifact.isValidated ? 'Validated' : 'Pending'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Builder</span>
                        <span className="text-sm font-mono text-gray-700">
                          {formatAddress(selectedArtifact.builder)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Honor Hours</span>
                        <span className="text-sm font-medium text-gray-900">
                          {selectedArtifact.accHonorHours.toString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Address</span>
                        <span className="text-sm font-mono text-gray-700">
                          {formatAddress(selectedArtifact.address)}
                        </span>
                      </div>
                    </div>

                    <div className="pt-4 space-y-2"> 
                      <button disabled className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
                        <ExternalLink className="w-4 h-4" />
                        <span>View on Explorer (coming soon) </span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="text-center text-gray-500">
                    <Award className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>Select an artifact to view details</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Owner Info */}
          {contractOwner && (
            <div className="fixed bottom-4 right-4 bg-white p-3 rounded-lg shadow border">
              <p className="text-xs text-gray-500">
                Owner: {formatAddress(contractOwner)}
                {contractOwner.toLowerCase() === currentAccount.toLowerCase() && (
                  <span className="ml-2 bg-green-100 text-green-800 px-2 py-1 rounded text-xs">You</span>
                )}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  
  // ==================== MAIN RENDER ====================
    // <div className="min-h-screen bg-gray-50">
  
  return (
    <div className="min-h-screen bg-gray-50">
      {!isConnected ? (
        <div className="min-h-screen bg-gray-50 p-6">
          <div className="max-w-4xl mx-auto">
            <WalletHeader />
            
            {/* Show help panel on connection page too */}
            <div className="mt-6">
              <HelpPanel />
            </div>
          </div>
        </div>
      ) : !contractManager && provider && signer ? (
        new URLSearchParams(window.location.search).get('org') ? (
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p>Loading organization...</p>
            </div>
          </div>
        ) :
        <OrganizationSelector 
          provider={provider}
          signer={signer}
          currentNetwork={currentNetwork}
          onSelectOrganization={handleSelectOrganization} 
        />
      ) : (
        <>
        <div className="flex flex-col lg:flex-row gap-6 p-4 lg:p-6">
          {/* Main dashboard - full width on mobile, flex-1 on desktop */}
          <div className="w-full lg:w-96 lg:order-2 lg:flex-shrink-0">
            <HelpPanel />
          </div>
          
          {/* Main dashboard - appears below help on mobile, left side on desktop */}
          <div className="w-full lg:flex-1 lg:order-1">
            <DashboardContent />
          </div>
        </div>
        <GenerateArtifactModal 
          isGenerateModalOpen={isGenerateModalOpen}
          setIsGenerateModalOpen={setIsGenerateModalOpen}
          orgData={orgData}
          currentAccount={currentAccount}
          fromAddress={fromAddress}
          setFromAddress={setFromAddress}
          builderAddress={builderAddress}
          setBuilderAddress={setBuilderAddress}
          location={location}
          setLocation={setLocation}
          shouldValidate={shouldValidate}
          setShouldValidate={setShouldValidate}
          onClose={() => setIsGenerateModalOpen(false)}
          onGenerate={handleGenerateArtifact}
          error={error}
          setError={setError}
        />
        <VouchModal 
          vouchModal={vouchModal}
          setVouchModal={setVouchModal}
          orgData={orgData}
          error={error}
          setError={setError}
          handleVouch={handleVouch}
          formatTokenAmount={formatTokenAmount}
          contractManager={contractManager} 
        />
        </>
        )
      }
    </div>
  );
}