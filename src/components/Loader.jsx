import { TailSpin } from 'react-loader-spinner'

function Loader() {
  return (
    <TailSpin
      visible={true}
      height="50"
      width="50"
      color="#F7931E"
      ariaLabel="tail-spin-loading"
      radius="1"
      wrapperStyle={{}}
      wrapperClass="flex items-center justify-center h-screen"
    />
  )
}

export default Loader
