---
sidebar_position: 2
---



# Artifact Vouching

## Vouch, not Transfer

Each document, code change, submodule, or product can be represented by an 
*artifact*. Each one is a node in a contribution network, and can have both 
HONOR vouched into it and staking rewards allocated to it. 
Vouching grants a user a share of ownership of that artifact. 
The total amount of vouched directly determines an HONOR price of each unit claimed.

This figure showcases how the artifacts link together to create a reputation network. In step 2, a new artifact is generated. In the final step, HONOR is vouched into the new artifact, benefiting those who supported that component by vouching early.
<img src={require('@site/static/img/flow_diag.png').default} />



## Prediction Market via Vouching Curves 

To produce an outcome where earlier vouching is more profitable than later, 
price will be determined with a reversible bonding curve, such that the Vouch 
claim is proportional to a sublinear function of amount of HONOR vouched. Since
this needs to be both continuous and computationally efficient within a smart 
contract, a square root function is the simplest choice. 

<!-- ```latex
$$
I = \int_0^{2\pi} \sin(x)\,dx
$$
```
 -->


## Builders Earn Vouching Claim 

Over time, the builder of an artifact gains a claim on the vouched HONOR in that
artifact. Imagine accumulated HONOR-hours that then convert to new vouching claim (share of the artifact). In order to benefit smaller contributions as well as 
speed up the initial rate of accumulation, this is another place where square or cubic roots are a convenient tracking function. It will eventually taper off as well.


Because investors, and in particular the protocol treasury, are subsidizing this builder recognition, there is a tension between speculating on the future value of an artifact and ownership transfer. However, we would posit that for worthwhile 
projects, investors will gladly give up part of their share to increase the value 
of overall project HONOR, as the org requires builders and should reward them 
for valued contributions. 

