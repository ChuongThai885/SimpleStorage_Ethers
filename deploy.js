const ethers= require("ethers");
const fs= require("fs-extra");

async function main() {
    // 
    const provider= new ethers.providers.JsonRpcProvider("http://172.23.160.1:7545");
    const wallet= new ethers.Wallet(
        "b3c380eec95009300aa14a56cf8687e6d013c798a7daf25aa33d8778e1706c4d",
        provider
    );
    const abi= fs.readFileSync(
        "./SimpleStorage_sol_SimpleStorage.abi",
        "utf-8"
    );
    const binary= fs.readFileSync(
        "./SimpleStorage_sol_SimpleStorage.bin",
        "utf-8"
    );

    const contractFactory= new ethers.ContractFactory(abi, binary, wallet);
    console.log("Deploying, please wait...");
    const contract= await contractFactory.deploy();
    console.log(contract);
}

main()
    .then(()=> process.exit(0))
    .catch((error)=> {
        console.error(error);
        process.exit(1);
    })
