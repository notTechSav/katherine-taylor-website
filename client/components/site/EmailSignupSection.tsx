const EmailSignupSection = () => {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto flex max-w-luxury flex-col items-center px-6 text-center sm:px-10">
        <h2 className="text-lg font-light tracking-[0.3em] text-gray-900 sm:text-xl">
          Latest from Tiffany
        </h2>
        <form className="mt-10 flex w-full max-w-2xl items-center gap-4 border-b border-gray-300 pb-3">
          <label htmlFor="email-signup" className="sr-only">
            Email address
          </label>
          <input
            id="email-signup"
            type="email"
            name="email"
            placeholder="EMAIL"
            autoComplete="email"
            className="flex-1 border-0 bg-transparent text-sm uppercase tracking-[0.4em] text-gray-700 outline-none placeholder:text-gray-500 focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-sm bg-gray-100 px-6 py-3 text-xs font-medium uppercase tracking-[0.4em] text-gray-900 transition-colors duration-luxury-fast hover:bg-gray-200"
          >
            Sign Up
          </button>
        </form>
      </div>
    </section>
  );
};

export default EmailSignupSection;
