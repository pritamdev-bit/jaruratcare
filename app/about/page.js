export default function AboutPage() {
  return (
    <main className="flex items-center justify-center px-6 py-12">
      <div className="max-w-3xl w-full bg-white shadow-md rounded-2xl p-8">
        <h1 className="md:text-4xl text-2xl font-bold text-center text-blue-700 mb-6">
          About Jarurat Care
        </h1>

        <p className="text-gray-700 leading-relaxed mb-4">
          At Jarurat Care, we are dedicated to providing <span className="font-bold">compassionate,
          patient-centered</span> medical services. Our focus is on promoting overall
          health and well-being through <span className="font-bold">reliable care, modern facilities, and a
          team of experienced</span> professionals.
        </p>

        <p className="text-gray-700 leading-relaxed mb-4">
          We believe in combining advanced medical practices with a warm and
          welcoming environment. Whether you are visiting for <span className="font-bold">routine check-ups,
          specialized treatments, or preventive health programs</span>, our goal is to
          ensure every patient feels supported and valued.
        </p>

        <p className="text-gray-700 leading-relaxed">
          Jarurat Care continues to grow as a trusted healthcare partner for
          families and communities, striving each day to make quality medical
          services accessible to everyone.
        </p>
      </div>
    </main>
  );
}
