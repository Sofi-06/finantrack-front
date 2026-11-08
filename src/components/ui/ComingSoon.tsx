type ComingSoonProps = {
  title: string;
  description: string;
};

export default function ComingSoon({ title, description }: ComingSoonProps) {
  return (
    <main className="page-shell">
      <section className="empty-state">
        <span>Próximamente</span>
        <h2>{title}</h2>
        <p>{description}</p>
      </section>
    </main>
  );
}
