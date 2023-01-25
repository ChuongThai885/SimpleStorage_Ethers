const ethers= require("ethers");
const fs= require("fs-extra");
require("dotenv").config();

async function main() {

    const provider= new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
    const wallet= new ethers.Wallet(process.env.PRIVATE_KEY, provider);
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
    await contract.deployTransaction.wait(1);
    // console.log("Deployment transaction (transaction response): ");
    // console.log(contract.deployTransaction);
    // console.log("Transaction receipt: ")
    // console.log(transactionReceipt);

    // get fav_number
    const currentNumber= await contract.retrieve();
    console.log(`Current favourite number: ${currentNumber.toString()}`);
    const transactionResponse= await contract.store("72910");
    const transactionReceipt= await transactionResponse.wait(1);
    const updatedNumber= await contract.retrieve();
    console.log(`Current favourite number: ${updatedNumber.toString()}`);
}

main()
    .then(()=> process.exit(0))
    .catch((error)=> {
        console.error(error);
        process.exit(1);
    })
