import { SearchBar } from '@/components/search-bar';
import Typography from '@/components/typography';

export default function Home() {
  return (
    <div className="grid items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-inter)]">
      <SearchBar />
      <Typography.H1>The Legend of Zelda: Breath of the Wild 1</Typography.H1>
      <div
            className="flex items-center justify-center w-12 h-12 bg-white rounded-lg shadow-lg"
            style={{
              boxShadow:
                '0px 2px 4px 0px rgba(227, 193, 216, 0.6),2px -2px 2px 0px rgba(249, 236, 253, 1) inset',
            }}
          >
            <span className="text-lg font-medium ">
              S
            </span>
          </div>
    </div>
  );
}
