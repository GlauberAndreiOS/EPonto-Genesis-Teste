import fs from 'fs'
import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv } from "vite"

export default function ({ mode }: any) {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  return defineConfig({
    plugins: [react()],
    server: {
      https: {
        key: fs.readFileSync(path.resolve(__dirname, 'certificate/key.pem')),
        cert: fs.readFileSync(path.resolve(__dirname, 'certificate/cert.pem')),
      },
      port: parseInt(process.env.VITE_PORT || "443"),
      host: '0.0.0.0'
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  })
}