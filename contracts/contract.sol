pragma solidity >=0.7.0 <0.9.0;

contract CovidExams {
   
    struct Exam {
        string cpf;
        bool isInfected;
        bool isLastExam;
        uint id;
        uint256 timestamp;
    }
    
    Exam[] public arrayExams;
    uint public nextId;
    
    function createOrUpdate(string memory _cpf, bool _isInfected) public{
        
        if (checkUser(_cpf)) {
            //In case that the user is already registered, walks the array setting all previous exams isLastExam attribute to false
            for (uint i=0; i < arrayExams.length; i++) {
                if(compareStrings(arrayExams[i].cpf, _cpf)){
                    arrayExams[i].isLastExam = false;
                }
            }
        }
        
         //Adding the latest exam
        arrayExams.push(Exam({
            cpf:_cpf, 
            isInfected:_isInfected, 
            isLastExam:true,
            id:nextId,
            timestamp:block.timestamp
        }));
        
        nextId++;
    }
    
    //A "view" function can read data from the storage
    function retrieveLastExamByCpf(string memory _cpf) public view returns (Exam memory){
        for (uint i=0; i < arrayExams.length; i++) {
            if(compareStrings(arrayExams[i].cpf, _cpf)){
                if(arrayExams[i].isLastExam){
                    return arrayExams[i];
                }
            }
        }
        
        //A revert function is used to handle errors, reverting the transaction to his initial state
        revert('Not found');
    }
    
    function checkUser(string memory _cpf) public view returns (bool){
        bool userFound = false;
        
        for (uint i=0; i < arrayExams.length; i++) {
            if(compareStrings(arrayExams[i].cpf, _cpf)){
                userFound = true;
                break;
            }
        }
        
        return userFound;
    }
    
    //A "pure" function does not read data from the storage.
    function compareStrings(string memory a, string memory b) public pure returns (bool) {
        
        //The compiler cannot read string in his native state. Its necessary to convert to something that cand read: a keccak256 hash
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
    }
}