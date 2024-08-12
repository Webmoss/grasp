# Grasp Academy

**Project Name:** Grasp Academy

**Project Description:**

Grasp Academy is an education content platform built for educators and creators to share their skills and knowledge, and earn directly for their work. Grasp is built on the innovative EDU Chain and powered by Open Campus. Our web3 platform integrates Open Campus ID, allowing users to easily connect, learn, earn, and be rewarded for excellence.

Grasp Academy is built with a learner-first philosophy, placing education and the overall learning experience at the forefront. Our mission is to streamline the onboarding process for learners, communities, and corporate staff by providing a well-structured and engaging learning journey.

Grasp aims to revolutionise the way users onboard, learn, and earn by leveraging the power of blockchain, EduFi, AI, and tokenised rewards in the form of tokens and NFTs.

By prioritising the educational experience and providing a comprehensive and rewarding learning ecosystem, Grasp Academy will empower learners, tech companies, DAOs, and content creators to achieve their educational goals and foster a culture of continuous learning and excellence.

**Twitter:** <https://x.com/GraspAcademy>
**Website:** <https://grasp-academy.netlify.app/>
**GitHub:** <https://github.com/Webmoss/grasp>

**Team:**

- Craig Moss, Software Engineer (IO Digital)
- I am currently employed at IO Digital as a Full Stack/Frontend Developer and work on quite a few exciting projects for the company and their clients using agile methodologies.
- In my spare time I enjoy attending various web3 hackathon events and building with new exciting blockchain technologies.
- I am an active member of the ApeCoin DAO and authored AIP 376 which formed the Web3 Development Working Group and was recently accepted in the first round of the APE_U AIP Coaches.

**Key Features:**

1. **Learner and Education First:**
   - Strong focus on providing a high-quality educational experience for learners.
   - Prioritise the needs of learners and educators to ensure effective knowledge transfer.
   - Support diverse learning styles and provides resources tailored to individual needs.

2. **Learning Management System (LMS):**
   - Onboarding for learners, companies, web3 and DAO community members.
   - Structured educational tracks for various purposes, including corporate companies and DAOs.

3. **EduFi Integration:**
   - Incentives for completing courses, such as NFTs and tokens
   - Financing of education through grants and loans

4. **Rewards-Based Learning:**
   - Users earn NFTs and $EDU tokens upon course completion.
   - Encourages excellence and engagement through tangible rewards.
   - Proof of learning offers students skills verification for the job market.

5. **Learn, Earn, and Get Rewarded:**
   - Grasp Academy aims to build a comprehensive education ecosystem with utility    that will help users learn, earn, and be rewarded for academic excellence opening up opportunities for students from all walks of life to finance their education, all powered by Open Campus on EDU Chain.
   - Provide seamless integration with EduFi for financial support to those who need it most.

6. **Content Platform for Creators:**
   - Enables creators to share their work, videos, and educational content.
   - Creators can earn directly from their contributions using the Grasp web3 platform.
   - Supports a variety of content formats, including video tutorials, articles, and interactive courses.

7. **Web3Auth and Open Campus ID Integration:**
   - Simplifies the authentication process for users using account abstraction.

8. **AI Integration:**
   - Utilizes AI to improve the user experience in creating content, personalizing learning paths, and providing real-time feedback.

**Project Goals:**

1. **Facilitate Onboarding:**
   - Provide a streamlined onboarding process for new users, staff, and DAO members.
   - Create specific educational tracks for different communities, including the ApeCoin DAO.

2. **Promote Education through Rewards:**
   - Encourage users to complete courses by offering NFTs and $EDU tokens as rewards.
   - Foster a culture of learning and excellence within the community.

3. **Support Education Financing:**
   - Utilize EduFi to provide grants and loans for educational purposes.
   - Ensure users have access to financial resources to support their learning journey.

4. **Empower Content Creators:**
   - Create a platform where educators and content creators can share their work and earn rewards.
   - Provide tools and resources for creators to develop and distribute high-quality educational content.

5. **Create a Comprehensive Learning Ecosystem:**
   - Develop and integrate dapps that support learning, earning, and financing education on the EDU Chain.
   - Offer a holistic and interconnected educational experience.

6. **Launch $GRASP Token and NFTs:**
   - Introduce $GRASP token to reward users, enable staking, and provide returns.
   - Launch NFTs to give users additional access and rewards for staking and holding.

**Target Audience:**

1. **Learners:**
   - Individuals seeking a high-quality, rewarding educational experience.
   - Users looking to leverage EduFi for education financing.

2. **Companies:**
   - Onboarding and training for new staff.
   - Continuous learning opportunities for existing employees.

3. **DAOs:**
   - Onboarding new community members.
   - Structured educational tracks for DAO-specific knowledge and skills.

4. **Content Creators:**
   - Educators and experts looking to share their knowledge and earn rewards.
   - Creators producing video tutorials, articles, and interactive courses.

**Technology Stack:**

1. **Blockchain:**
   - Built on EDU Chain.
   - Utilizes $EDU tokens for rewards and transactions.
   - Plans to introduce $GRASP token for additional rewards and staking.

2. **Authentication:**
   - Integrated with Web3Auth for secure and seamless user authentication.

3. **EduFi Dapps:**
   - Incorporates dapps for education financing, learning, and earning on EDU Chain.

4. **AI Tools:**
   - Employs AI for content creation assistance, personalized learning paths, and real-time feedback.

**Implementation Timeline:**

1. **Phase 1: Planning and Design (Month 1-2):**
   - Define project scope and requirements.
   - Design user interface and user experience.
   - Plan integration with EDU Chain, EduFi, and AI tools.

2. **Phase 2: Development (Month 3-6):**
   - Develop core LMS functionalities.
   - Integrate Web3Auth for user authentication.
   - Build and integrate EduFi dapps for grants, loans, learning, and earning.
   - Develop content creation and sharing tools for creators.
   - Implement AI features for content creation and personalized learning.
   - Plan and initiate $GRASP token development and NFT launch.

3. **Phase 3: Testing and Deployment (Month 7-8):**
   - Conduct comprehensive testing (functional, security, and performance).
   - Deploy the platform on EDU Chain.
   - Launch initial onboarding and educational tracks.
   - Roll out features for content creators to share and monetize their work.
   - Launch $GRASP token and NFT features for staking and rewards.

4. **Phase 4: Post-Launch and Scaling (Month 9-12):**
   - Monitor platform performance and user feedback.
   - Scale the platform to accommodate more users, educational tracks, and content creators.
   - Enhance features and functionalities based on user feedback.
   - Expand $GRASP token and NFT ecosystem based on user engagement.

## Technical Details

The entire Grasp Academy project lives in this repo currently with the Smart Contracts at the root, Foundry has been used for the setup and config of all our Smart contract development for EDU Chain.

The Front-end lives in the pwa folder and is built using vue.js and uses web3Auth for account abstraction to make it easy for user to onboard.
I have integrated the Open Campus ID (OCID) sdk with more features to come as they are released.
The Grasp ERC-20 Token and Grasp NFT ERC-721 contracts have been deployed to the Open Campus testnet with details below.

## Getting Started

If this is your first time with Foundry, check out the
[installation](https://github.com/foundry-rs/foundry#installation) instructions.
This is a list of the most frequently needed commands.

### Build

Build the contracts:

```sh
forge build
```

### Clean

Delete the build artifacts and cache directories:

```sh
forge clean
```

### Compile

Compile the contracts:

```sh
forge build
```

### Deploy

Deploy to Open Campus:

```sh
forge script script/DeployGraspToken.s.sol --broadcast --rpc-url https://rpc.open-campus-codex.gelato.digital --gas-limit 30000000 --with-gas-price 5gwei --skip-simulation
```

```sh
forge script script/DeployGraspNFT.s.sol --broadcast --rpc-url https://rpc.open-campus-codex.gelato.digital --gas-limit 30000000 --with-gas-price 5gwei --skip-simulation
```

### Verifying the smart contracts

```sh
forge verify-contract \
  --rpc-url https://rpc.open-campus-codex.gelato.digital \
  --verifier blockscout \
  --verifier-url 'https://opencampus-codex.blockscout.com/api/' \
  0x3eB2Eb8E2a0E26BEf3Dc3E78289Be7343355FeBC \
  src/GraspToken.sol:GraspToken
```

```sh
forge verify-contract \
  --rpc-url https://rpc.open-campus-codex.gelato.digital \
  --verifier blockscout \
  --verifier-url 'https://opencampus-codex.blockscout.com/api/' \
  0x7E97F031Aab9F389BD3C8Cd1ae8eF98C8a15b5f6 \
  src/GraspNFT.sol:GraspNFT
```

## Deploy Confirmations

Grasp Token Contract deployed to : 0x3eB2Eb8E2a0E26BEf3Dc3E78289Be7343355FeBC

```sh
Start verifying contract `0x3eB2Eb8E2a0E26BEf3Dc3E78289Be7343355FeBC` deployed on 656476

Submitting verification for [src/GraspToken.sol:GraspToken] 0x3eB2Eb8E2a0E26BEf3Dc3E78289Be7343355FeBC.
Submitted contract for verification:
Response: `OK`
GUID: `3eb2eb8e2a0e26bef3dc3e78289be7343355febc66b79079`
URL: https://opencampus-codex.blockscout.com/address/0x3eb2eb8e2a0e26bef3dc3e78289be7343355febc
```

Grasp NFT Contract deployed to: 0x7E97F031Aab9F389BD3C8Cd1ae8eF98C8a15b5f6

```sh
Start verifying contract `0x7E97F031Aab9F389BD3C8Cd1ae8eF98C8a15b5f6` deployed on 656476

Submitting verification for [src/GraspNFT.sol:GraspNFT] 0x7E97F031Aab9F389BD3C8Cd1ae8eF98C8a15b5f6.
Submitted contract for verification:
Response: `OK`
GUID: `7e97f031aab9f389bd3c8cd1ae8ef98c8a15b5f666b79135`
URL: https://opencampus-codex.blockscout.com/address/0x7e97f031aab9f389bd3c8cd1ae8ef98c8a15b5f6
```

### Format

Format the contracts:

```sh
forge fmt
```

### Gas Usage

Get a gas report:

```sh
forge test --gas-report
```

### Test

Run the tests:

```sh
forge test
```
