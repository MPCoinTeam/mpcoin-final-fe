import { NODE_ENV_DEFAULT } from "@/common/constants/Environments"
import { defaltTokens } from "@/common/constants/Tokens"
import useConfig from "@/domain/usecases/hooks/configs/useConfig"

export function useTokens() {
    const { nodeEnv } = useConfig()
    if (nodeEnv == NODE_ENV_DEFAULT) {
        return {
            tokens: defaltTokens,
            pagination: {
                offset: 0,
                limit: 10,
                total: 1
            }
        }
    }
    return {}
}
