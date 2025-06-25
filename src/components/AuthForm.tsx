import React from 'react';

interface AuthFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  register: any;
  errors: any;
  buttonText: string;
}

const AuthForm: React.FC<AuthFormProps> = ({ onSubmit, register, errors, buttonText }) => (
  <form onSubmit={onSubmit} className="flex flex-col gap-4">
    {/* Email Input Field */}
    <div>
      <div className="mb-1 flex items-center justify-between">
        <label className="block text-sm text-[#858882]">Email</label>
        {errors.email && <span className="text-sm text-red-500">{errors.email.message}</span>}
      </div>
      <input
        type="email"
        placeholder="Your email address"
        {...register('email')}
        className="w-full rounded-lg border border-[#232325] bg-[#232325] px-4 py-2 text-white placeholder:text-[#858882] focus:border-[#b0e636] focus:outline-none"
      />
    </div>

    {/* Password Input Field */}
    <div>
      <div className="mb-1 flex items-center justify-between">
        <label className="block text-sm text-[#858882]">Password</label>
        {errors.password && <span className="text-sm text-red-500">{errors.password.message}</span>}
      </div>
      <input
        type="password"
        placeholder="Your password"
        {...register('password')}
        className="w-full rounded-lg border border-[#232325] bg-[#232325] px-4 py-2 text-white placeholder:text-[#858882] focus:border-[#b0e636] focus:outline-none"
      />
    </div>

    {/* Submit Button */}
    <button type="submit" className="w-full cursor-pointer rounded-lg bg-[#b0e636] py-3 text-base font-semibold text-black transition hover:bg-[#a0d62c]">
      {buttonText}
    </button>
  </form>
);

export default AuthForm;
