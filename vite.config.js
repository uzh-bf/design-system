import react from '@vitejs/plugin-react-swc'

export default {
  server: {
    open: 'none',
  },
  plugins: [react()],
}
