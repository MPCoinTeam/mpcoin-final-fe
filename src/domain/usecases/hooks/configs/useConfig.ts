import { NODE_ENV_DEFAULT } from "@/common/constants/Environments";

const useConfig = ()=>({
    nodeEnv: process.env.NODE_ENV || NODE_ENV_DEFAULT
})

export default useConfig;
