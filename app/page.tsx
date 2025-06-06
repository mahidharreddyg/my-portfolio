import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import Section from "@/components/section"

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-900 text-white">
      <Navbar />
      <HeroSection />

      <Section id="about" title="About Me" className="bg-zinc-800">
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Passionate software developer with expertise in modern web technologies. I love creating innovative solutions
          that make a difference.
        </p>
      </Section>

      <Section id="skills" title="Skills & Technologies" className="bg-zinc-900">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
          {["React", "Next.js", "TypeScript", "Node.js", "Python", "AWS", "Docker", "GraphQL"].map((skill) => (
            <div
              key={skill}
              className="p-4 bg-gray-800/50 rounded-lg border border-gray-700/50 hover:border-blue-500/50 transition-colors"
            >
              <span className="text-gray-300">{skill}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section id="experience" title="Experience" className="bg-zinc-800">
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Building scalable applications and leading development teams for over 5 years.
        </p>
      </Section>

      <Section id="projects" title="Featured Projects" className="bg-zinc-900">
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Showcasing innovative solutions and creative problem-solving approaches.
        </p>
      </Section>

      <Section id="certifications" title="Certifications" className="bg-zinc-800">
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Continuous learning and professional development achievements.
        </p>
      </Section>
    </main>
  )
}
