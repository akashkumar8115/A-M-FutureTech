export default function TechnologiesPage() {
  return (
    <main>
      <section className="section-shell">
        <div className="container text-center">
          <span className="badge">Technologies</span>
          <h1 className="section-title mx-auto mt-6 max-w-4xl">Modern technology stacks for scalable digital delivery.</h1>
        </div>
      </section>

      <section className="section-shell surface-alt">
        <div className="container grid gap-8 md:grid-cols-2 xl:grid-cols-5">
          {[['Frontend', ['React', 'Next.js', 'Angular', 'HTML5', 'CSS3', 'JavaScript', 'TypeScript']], ['Backend', ['Java', 'Spring Boot', 'Node.js', 'REST APIs']], ['Mobile', ['Android', 'iOS', 'Flutter', 'React Native']], ['Database', ['MySQL', 'PostgreSQL', 'MongoDB']], ['Cloud & DevOps', ['AWS', 'Azure', 'Docker', 'CI/CD', 'Cloud Deployment']]].map(([label, items]) => (
            <div key={label as string} className="card-panel p-6">
              <h2 className="mb-5 text-xl font-bold text-[var(--text)]">{label as string}</h2>
              <div className="flex flex-wrap gap-2">
                {(items as string[]).map((tech) => (
                  <span key={tech} className="rounded-full border border-[var(--border)] bg-[var(--chip)] px-3 py-2 text-sm text-[var(--text)]">{tech}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
