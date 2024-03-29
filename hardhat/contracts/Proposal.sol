// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

interface DOSDAO {
    function propose(
        address[1] calldata targets,
        uint256[1] calldata values,
        bytes[1] calldata calldatas,
        string calldata description
    ) external returns (uint256 proposalId);

    function castVote(uint256 proposalId, uint8 support) external returns (uint256);

    function queue(
        address[1] memory targets,
        uint256[1] memory values,
        bytes[1] memory calldatas,
        bytes32 descriptionHash
    ) external returns (uint256 proposalId);

    function execute(uint256 proposalId) external;

    function getProposalState(uint256 proposalId) external view returns (uint8);
}

contract ResearcherContract {
    DOSDAO public dosdao;
    address public treasury_;

    constructor(address _dosdao, address _treasury) {
        dosdao = DOSDAO(_dosdao);
        treasury_ = _treasury;
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
    ) public {
        require(
            researchers[_researcher].walletid != address(0),
            "Researcher does not exist"
        );
        uint256 proposalId = dosdao.propose(
            [address(treasury_)],
            [uint256(0)],
            // function releaseFunds(address _payee, uint256 amount) public onlyOwner
            [
                abi.encodeWithSignature(
                    "releaseFunds(address,uint256)",
                    _researcher,
                    _grant
                )
            ],
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
    }

    function vote(uint256 _proposalId, uint256 _choice) public {
        Proposal storage proposal = proposals[_proposalId];
        require(
            checkproposalvoter[_proposalId][msg.sender] == false,
            "You have already voted"
        );
        dosdao.castVote(_proposalId, uint8(_choice));
        proposal.votes++;
        checkproposalvoter[_proposalId][msg.sender] = true;
    }

    function queueProposal(uint256 _proposalId) public {
        Proposal storage proposal = proposals[_proposalId];
        require(
            proposal.executed == false,
            "Proposal has already been executed"
        );
        dosdao.queue(
            [address(treasury_)],
            [uint256(0)],
            [
                abi.encodeWithSignature(
                    "releaseFunds(address,uint256)",
                    proposal.researcher,
                    proposal.grant
                )
            ],
            keccak256(abi.encodePacked(proposal.title))
        );
    }

    function executeProposal(uint256 _proposalId) public {
        Proposal storage proposal = proposals[_proposalId];
        
        require(
            proposal.executed == false,
            "Proposal has already been executed"
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
    ) public view returns (bool) {
        
    }

    function getProposalCount() public view returns (uint256) {
        return proposalCount;
    }

    function getResearcherCount() public view returns (uint256) {
        return researcherCount;
    }
}
