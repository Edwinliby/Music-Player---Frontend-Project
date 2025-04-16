import Form from './form'

export default function page() {
  return (
    <div className="flex h-screen w-full">
      <div className="hidden lg:block w-1/2 h-full">
        <img src="form.jpg" alt="bg" draggable={false} className="object-cover object-center w-full h-full" />
      </div>
      <div className="w-full lg:w-1/2 h-full">
        <Form />
      </div>
    </div>
  )
}
