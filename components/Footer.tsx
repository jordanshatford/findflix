import { GithubLogo } from 'phosphor-react';

const Footer = () => {
  const creator = 'Jordan Shatford';
  const githubLink = 'https://github.com/jordanshatford/findflix';
  return (
    <footer className="bg-zinc-800 border-t border-zinc-900">
      <div className="flex flex-col items-center px-8 py-6 mx-auto max-w-6xl sm:flex-row">
        <p className="text-zinc-400">
          © {new Date().getFullYear()} {creator}
        </p>
        <span className="inline-flex justify-center mt-4 space-x-5 sm:ml-auto sm:mt-0 sm:justify-start">
          <a
            href={githubLink}
            className="text-2xl hover:text-red-700 text-zinc-200"
            target="_blank"
          >
            <GithubLogo size={30} />
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
