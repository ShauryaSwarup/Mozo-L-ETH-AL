// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "../DOSToken.sol";

import "@openzeppelin/contracts/governance/Governor.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorSettings.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorCountingSimple.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotes.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotesQuorumFraction.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorTimelockControl.sol";
/// @custom:security-contact codingwithshaun@gmail.com
contract DOSDAO is Governor, GovernorSettings, GovernorCountingSimple, GovernorVotes, GovernorVotesQuorumFraction, GovernorTimelockControl
{
    address public treasury_;
    DOSToken public dost;
    constructor(
        IVotes _token,
        TimelockController _timelock,
        address _treasury,
        address _contracttoken
    )
        Governor("DOSDAO")
        GovernorSettings(0 /*  1 block */, 5 /* 3 minutes */, 0)
        GovernorVotes(_token)
        GovernorVotesQuorumFraction(5)
        GovernorTimelockControl(_timelock)
    {
        treasury_ = _treasury;
        dost = DOSToken(_contracttoken);
    }
     uint256 public proposalCount; // proposal count
    uint256 public researcherCount; // researcher count

    struct Researcher {
        address walletid;
        string name;
        string affiliation;
        string emaill;
        string university;
        string profession;
    }
    struct Proposal {
        uint256 id; // proposal id
        string title; // proposal title
        string description; // proposal description
        uint256 grant; // proposal grant
        address researcher; // researcher struct
        uint256 votes; // total votes
        uint256 snapshot; // block number
        uint256 deadline; // block number
        uint256 status; // proposal status
        bool queued; // executed status
        bool executed; // executed status
    }

    mapping(address => Researcher) public researchers; // researchers mapping
    mapping(uint256 => Proposal) public proposals; // proposals mapping
    mapping(uint256 => address[]) voters; // proposal voters mapping
    mapping(uint256 => mapping(address => bool)) public checkproposalvoter; // proposal votes mapping

    // =================================================================================================
    // Proposal & Researcher Functions
    // =================================================================================================

    function addResearcher(
        address _walletid,
        string memory _name,
        string memory _affiliation,
        string memory _emaill,
        string memory _university,
        string memory _profession
    ) public {
        require(
            researchers[_walletid].walletid == address(0),
            "Researcher already exists"
        );
        researchers[_walletid] = Researcher(
            _walletid,
            _name,
            _affiliation,
            _emaill,
            _university,
            _profession
        );
        dost.mint(_walletid, 100);
        researcherCount++;
    }

    // Check Whether Wallet Holder is a Resident
    function isResearcher(address _walletAddress) external view returns (bool) {
        // Check if the wallet holder is a researcher
        // walletid is not equal to 0x then the wallet holder is a researcher (true)
        return researchers[_walletAddress].walletid != address(0);
    }

    function addProposal(
        string memory _title,
        string memory _description,
        uint256 _grant,
        address _researcher
    ) public returns (uint256){
        require(
            researchers[_researcher].walletid != address(0),
            "Researcher does not exist"
        );
        address[] memory t1 = new address[](1);
        uint256[] memory t2 = new uint256[](1);
        bytes[] memory t3 = new bytes[](1);
        t1[0]=address(treasury_);
        t2[0]=uint256(0);
        t3[0]=abi.encodeWithSignature(
                    "releaseFunds(address,uint256)",
                    _researcher,
                    _grant
                );
        uint256 proposalId = propose(
            t1,
            t2,
            // function releaseFunds(address _payee, uint256 amount) public onlyOwner
            t3,
            _title
        );
        proposals[proposalId] = Proposal(
            proposalId,
            _title,
            _description,
            _grant,
            _researcher,
            0,
            block.number,
            block.number + 60,
            1,
            false,
            false
        );
        proposalCount++;
        dost.mint(msg.sender, 50);
        return proposalId;
    }

    function vote(uint256 _proposalId, uint256 _choice) public {
        Proposal storage proposal = proposals[_proposalId];
        require(
            checkproposalvoter[_proposalId][msg.sender] == false,
            "You have already voted"
        );
        castVote(_proposalId, uint8(_choice));
        proposal.votes++;
        dost.mint(msg.sender, 30);
        checkproposalvoter[_proposalId][msg.sender] = true;
    }

    function queueProposal(uint256 _proposalId) public {
        Proposal storage proposal = proposals[_proposalId];
        require(proposal.queued == false, "Proposal has already been queued");
        require(
            proposal.executed == false,
            "Proposal has already been executed"
        );
        address[] memory t1 = new address[](1);
        uint256[] memory t2 = new uint256[](1);
        bytes[] memory t3 = new bytes[](1);
        t1[0]=address(treasury_);
        t2[0]=uint256(0);
        t3[0]=abi.encodeWithSignature(
                    "releaseFunds(address,uint256)",
                    proposal.researcher,
                    proposal.grant
                );
        queue(
            t1,
            t2,
            t3,
            keccak256(abi.encodePacked(proposal.title))
        );
        proposal.queued = true;
    }

    function executeProposal(uint256 _proposalId) public {
        Proposal storage proposal = proposals[_proposalId];
        require(
            proposal.queued == true,
            "Proposal has not been queued"
        );
        require(
            proposal.executed == false,
            "Proposal has already been executed"
        );
        address[] memory t1 = new address[](1);
        uint256[] memory t2 = new uint256[](1);
        bytes[] memory t3 = new bytes[](1);
        t1[0]=address(treasury_);
        t2[0]=uint256(0);
        t3[0]=abi.encodeWithSignature(
                    "releaseFunds(address,uint256)",
                    proposal.researcher,
                    proposal.grant
                );
        execute(
            t1,
            t2,
            t3,
            keccak256(abi.encodePacked(proposal.title))
        );
        proposal.executed = true;
    }

    function getProposal(
        uint256 _proposalId
    ) public view returns (Proposal memory) {
        return proposals[_proposalId];
    }

    function getResearcher(
        address _walletAddress
    ) public view returns (Researcher memory) {
        return researchers[_walletAddress];
    }

    function getVoters(
        uint256 _proposalId,
        address _voter
    ) public view returns (bool) {}

    function getProposalCount() public view returns (uint256) {
        return proposalCount;
    }

    function getResearcherCount() public view returns (uint256) {
        return researcherCount;
    }
    // =================================================================================================
    // The following functions are overrides required by Solidity.
    // =================================================================================================
    function votingDelay()
        public
        view
        override(Governor, GovernorSettings)
        returns (uint256)
    {
        return super.votingDelay();
    }

    function votingPeriod()
        public
        view
        override(Governor, GovernorSettings)
        returns (uint256)
    {
        return super.votingPeriod();
    }

    function quorum(
        uint256 blockNumber
    )
        public
        view
        override(Governor, GovernorVotesQuorumFraction)
        returns (uint256)
    {
        return super.quorum(blockNumber);
    }

    function state(
        uint256 proposalId
    )
        public
        view
        override(Governor, GovernorTimelockControl)
        returns (ProposalState)
    {
        return super.state(proposalId);
    }

    function proposalNeedsQueuing(
        uint256 proposalId
    ) public view override(Governor, GovernorTimelockControl) returns (bool) {
        return super.proposalNeedsQueuing(proposalId);
    }

    function proposalThreshold()
        public
        view
        override(Governor, GovernorSettings)
        returns (uint256)
    {
        return super.proposalThreshold();
    }

    function _queueOperations(
        uint256 proposalId,
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        bytes32 descriptionHash
    ) internal override(Governor, GovernorTimelockControl) returns (uint48) {
        return
            super._queueOperations(
                proposalId,
                targets,
                values,
                calldatas,
                descriptionHash
            );
    }

    function _executeOperations(
        uint256 proposalId,
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        bytes32 descriptionHash
    ) internal override(Governor, GovernorTimelockControl) {
        super._executeOperations(
            proposalId,
            targets,
            values,
            calldatas,
            descriptionHash
        );
    }

    function _cancel(
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        bytes32 descriptionHash
    ) internal override(Governor, GovernorTimelockControl) returns (uint256) {
        return super._cancel(targets, values, calldatas, descriptionHash);
    }

    function _executor()
        internal
        view
        override(Governor, GovernorTimelockControl)
        returns (address)
    {
        return super._executor();
    }
}
