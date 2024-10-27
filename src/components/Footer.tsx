"use client";
export default function Footer() {
  return (
    <footer className="w-full bg-blue-600 text-white py-6 mt-12">
      <div className="container mx-auto flex flex-col items-center space-y-4">
        <h2 className="text-xl font-semibold">Get in Touch</h2>
        <p className="text-sm italic">I’d love to hear from you!</p>

        <div className="flex space-x-6">
          <div className="text-center">
            <h3 className="text-lg font-medium">Email</h3>
            <p className="text-blue-200">m121zeeshan@gmail.com</p>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-medium">Phone</h3>
            <p className="text-blue-200">0344 4997472</p>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-medium">Location</h3>
            <p className="text-blue-200">Bahawalpur , pakistan</p>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm text-blue-300">
            {"\u00A9"} {new Date().getFullYear()} Sanity Project
          </p>
        </div>
      </div>
    </footer>
  );
}
