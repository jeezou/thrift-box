# Setup
> :warning: **The project was developed and run in WSL2**\
> :warning: **Tested on WSL2 and Windows 11**

### .env file example
>Don't forget to paste BSCSCAN_API_KEY

```env
WALLET_ADDRESS=0xdDa9365BbC83E17Cf99E530D2d6F1425C0Fd8137
BSC_USD_CONTRACT=0x55d398326f99059fF775485246999027B3197955

BSCSCAN_API_KEY=<YOUR API KEY>

CREDENTIALS_LOGIN=<AUTH LOGIN>
CREDENTIALS_PASSWORD=<AUTH PASSWORD>
```

# Project Launch
### These commands execute scripts located in the /bash directory
> Build script deploys a docker container that contains two services (nuxt and mongo)\
> Dev script starts the built container
```bash
# Build project on first load
bash bash/build

# Run without building
bash bash/dev
```