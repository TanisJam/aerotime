import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-inter)]">
      <h1 className="text-4xl font-bold text-center">Hello, World!</h1>
      <Button variant={'default'}>Click me</Button>
      <Button variant={'destructive'}>Click me</Button>
      <Button variant={'ghost'}>Click me</Button>
      <Button variant={'link'}>Click me</Button>
      <Button variant={'outline'}>Click me</Button>
      <Button variant={'secondary'}>Click me</Button>

      <p className="text-lg text-center ">
        Grand Theft Auto San Andreas Welcome to your new AeroTime project. This
        is a simple Next.js project with Tailwind CSS and TypeScript.
      </p>
    </div>
  );
}
