interface FooterProps {
  dict: {
    footer: { rights: string };
  };
}

export function Footer({ dict }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-6 py-8 text-center">
        <p className="text-sm text-muted">
          &copy; {year} Sony Yoga. {dict.footer.rights}
        </p>
      </div>
    </footer>
  );
}
