import Head from "next/head";

type Props = {
  title: string;
  children: React.ReactNode;
};

export default function Wrapper({ title, children }: Props) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      {children}
    </>
  );
}
