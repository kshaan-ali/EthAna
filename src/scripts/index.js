import { PinataSDK }from "pinata-web3"
// const fs = require("fs")
// require("dotenv").config()

const pinata = new PinataSDK({
  pinataJwt: import.meta.env.VITE_PINATA_JWT,
  pinataGateway: import.meta.env.VITE_GATEWAY_URL
})

export async function uploadJSON(jsonData){
    try {
      //console.log(import.meta.env.VITE_PINATA_JWT,import.meta.env.VITE_GATEWAY_URL)
      //const jsonData = { message: "Hello, world!" }; // replace with your JSON data
      const blob = new Blob([JSON.stringify(jsonData)], { type: "application/json" });
      const file = new File([blob], "data.json", { type: "application/json" });
  
      const upload = await pinata.upload.file(file);
      console.log(upload);
      return upload.IpfsHash
    } catch (error) {
      console.log(error);
    }
  }

