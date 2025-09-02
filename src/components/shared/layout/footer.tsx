import React from "react";

const Footer = () => {
  return (
    <footer className="bg-background">
      <div className="mx-auto max-w-3xl px-4 py-2 text-center text-sm">
        Who needs a footer? @ {new Date().getFullYear()}
      </div>
    </footer>
  );
};

export default Footer;
