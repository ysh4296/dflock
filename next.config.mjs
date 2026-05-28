import TsMock from "unplugin-ts-mock/webpack";

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, { isServer }) {
    const plugin = TsMock({ dir: "." })

    // 원래 transformInclude 래핑해서 SSR에서 어떤 ID가 오는지 확인
    if (isServer) {
      const originalApply = plugin.apply.bind(plugin)
      plugin.apply = (compiler) => {
        compiler.hooks.normalModuleFactory.tap('debug', (factory) => {
          factory.hooks.beforeResolve.tap('debug', (data) => {
            if (data?.request?.includes('mockData')) {
              console.log('[debug] SSR module ID:', data.request, data.contextInfo?.issuer)
            }
          })
        })
        originalApply(compiler)
      }
    }

    config.plugins.push(plugin)
    return config
  }
};

export default nextConfig;
