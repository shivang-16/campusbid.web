'use client'

export default function InitialInfoForm() {

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-100 to-teal-200">
      <div className="flex flex-col items-center text-center space-y-8">
        {/* Circular Loader */}
        <div className="relative flex items-center justify-center">
          <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-gray-400"></div>
        </div>

        {/* Welcome Message */}
        <h2 className="text-teal-600 text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide animate-fadeIn">
          Welcome to the CampusBid Family!
        </h2>
        <p className="text-gray-600 text-lg md:text-xl max-w-lg opacity-90 animate-slideUp">
          We’re thrilled to have you with us on this journey. Your presence here makes our community more vibrant!
        </p>
        <p className="text-gray-500 text-sm opacity-80">
          Setting things up for a seamless experience...
        </p>
      </div>
    </div>
  )
}
