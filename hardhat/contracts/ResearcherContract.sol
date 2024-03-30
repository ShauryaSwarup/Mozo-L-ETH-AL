// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./DOSToken.sol";

contract ResearcherContract {
    address public treasury_;
    DOSToken public dost;

    constructor(address _treasury, address _contracttoken) {
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
        uint256 yay; // total yay votes
        uint256 nay; // total nay votes
        uint256 snapshot; // block number
        uint256 deadline; // block number
        bool queued; // executed status
        bool executed; // executed status
    }

    mapping(uint256 => Researcher) public researchIds; // researchIds mapping
    mapping(address => Researcher) public researchers; // researchers mapping

    mapping(uint256 => Proposal) public proposals; // proposals mapping
    mapping(uint256 => address[]) voters; // proposal voters mapping
    mapping(uint256 => mapping(address => bool)) public checkproposalvoter; // proposal votes mapping
    mapping(uint256 => address[]) public proposalvoters; // proposal voters mapping
    mapping(address => Proposal[]) public researcherProposals; // researcher proposals mapping

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
    ) public returns (uint256) {
        require(
            researchers[_researcher].walletid != address(0),
            "Researcher does not exist"
        );
        proposals[proposalCount] = Proposal(
            proposalCount,
            _title,
            _description,
            _grant,
            _researcher,
            0,
            0,
            0,
            block.number,
            block.number + 60,
            false,
            false
        );
        proposalCount++;
        dost.mint(msg.sender, 50);
        return proposalCount;
    }

    function vote(uint256 _proposalId, uint256 _choice) public {
        Proposal storage proposal = proposals[_proposalId];
        require(
            checkproposalvoter[_proposalId][msg.sender] == false,
            "You have already voted"
        );
        require(block.number <= proposal.deadline, "Voting period has ended");
        if (_choice == 0) {
            proposal.nay += dost.balanceOf(msg.sender);
        } else if (_choice == 1) {
            proposal.yay += dost.balanceOf(msg.sender);
        }
        proposal.votes++;
        dost.mint(msg.sender, 30);
        checkproposalvoter[_proposalId][msg.sender] = true;
    }

    function queueProposal(uint256 _proposalId) public {
        Proposal storage proposal = proposals[_proposalId];
        require(
            block.number > proposal.deadline,
            "Voting period has not ended"
        );
        require(proposal.votes > 0, "Proposal has not been voted on");
        require(
            proposal.yay >= ((dost.totalSupply() * 3) / 100),
            "Proposal has not been approved"
        );
        require(proposal.queued == false, "Proposal has already been queued");
        require(
            proposal.executed == false,
            "Proposal has already been executed"
        );
        proposal.queued = true;
    }

    function executeProposal(uint256 _proposalId) public {
        Proposal storage proposal = proposals[_proposalId];
        require(proposal.queued == true, "Proposal has not been queued");
        require(
            proposal.executed == false,
            "Proposal has already been executed"
        );
        proposal.executed = true;
        (bool success, ) = address(treasury_).call(
            abi.encodeWithSignature(
                "releaseFunds(address,uint256)",
                proposal.researcher,
                proposal.grant
            )
        );
        require(success, "Failed to execute proposal");
    }

    // State Functions
    function isVotingPeriod(uint256 _proposalId) public view returns (bool) {
        return block.number <= proposals[_proposalId].deadline;
    }
    function isApproved(uint256 _proposalId) public view returns (bool) {
        return proposals[_proposalId].yay >= ((dost.totalSupply() * 3) / 100);
    }
    function isQueued(uint256 _proposalId) public view returns (bool) {
        return proposals[_proposalId].queued;
    }
    function isExecuted(uint256 _proposalId) public view returns (bool) {
        return proposals[_proposalId].executed;
    }

    // Getter Functions
    function getSnapshot(uint256 _proposalId) public view returns (uint256) {
        return proposals[_proposalId].snapshot;
    }

    function getDeadline(uint256 _proposalId) public view returns (uint256) {
        return proposals[_proposalId].deadline;
    }

    function getCurrentBlock() public view returns (uint256) {
        return block.number;
    }

    function getProposalCount() public view returns (uint256) {
        return proposalCount;
    }

    function getProposalById(
        uint256 _proposalId
    ) public view returns (Proposal memory) {
        return proposals[_proposalId];
    }

    function getProposalsByResearcher(
        address _researcher
    ) public view returns (Proposal[] memory) {
        return researcherProposals[_researcher];
    }

    function getProposalVoters(
        uint256 _proposalId
    ) public view returns (address[] memory) {
        return proposalvoters[_proposalId];
    }

    function getAllProposals() public view returns (Proposal[] memory) {
        Proposal[] memory _proposals = new Proposal[](proposalCount);
        for (uint256 i = 0; i < proposalCount; i++) {
            _proposals[i] = proposals[i];
        }
        return _proposals;
    }

    function getResearcherCount() public view returns (uint256) {
        return researcherCount;
    }

    function getResearcherByAddress(
        address _walletAddress
    ) public view returns (Researcher memory) {
        return researchers[_walletAddress];
    }

    function getAllResearchers() public view returns (Researcher[] memory) {
        Researcher[] memory _researchers = new Researcher[](researcherCount);
        for (uint256 i = 0; i < researcherCount; i++) {
            _researchers[i] = researchers[researchIds[i].walletid];
        }
        return _researchers;
    }
}
