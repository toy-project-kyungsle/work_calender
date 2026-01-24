import { CalendarWithSheet } from "@/components/CalendarWithSheet";
import { getJournals } from "@/lib/journals";

export default async function Home() {
  const journals = await getJournals();

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "#f4efe7",
        backgroundImage:
          "radial-gradient(circle at top, #fbf7f0 0%, #f4efe7 45%, #efe9df 100%)",
      }}
    >
      <main className="mx-auto flex w-full max-w-6xl flex-col py-12">
        <CalendarWithSheet journals={journals} />
      </main>
    </div>
  );
}