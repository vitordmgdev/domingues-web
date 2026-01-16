"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoveRight, ShoppingBasket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function Home() {
  return (
    <section className="layout">
      <main className="flex flex-col lg:flex-row h-[75dvh] justify-center lg:justify-between items-center">
        <div className="flex flex-col justify-between h-full w-full max-w-2xl py-32">
          <div className="flex flex-col">
            <div className="flex justify-between items-center">
              <Badge className="h-fit font-normal">
                São Francisco do Sul, Praia do Ervino
              </Badge>

              <div className="flex gap-2">
                <Button variant="ghost" size="icon" asChild>
                  <Link
                    href="https://www.facebook.com/domingues.marcenaria"
                    target="_blank"
                  >
                    <FaFacebook />
                  </Link>
                </Button>

                <Button variant="ghost" size="icon" asChild>
                  <Link
                    href="https://www.instagram.com/domingues.marcenaria"
                    target="_blank"
                  >
                    <FaInstagram />
                  </Link>
                </Button>

                <Button variant="ghost" size="icon" asChild>
                  <Link href="https://wa.me/5547999999999" target="_blank">
                    <FaWhatsapp />
                  </Link>
                </Button>
              </div>
            </div>

            <h1
              className={`text-[clamp(2rem,5vw,2.5rem)] leading-[1.1] font-medium font-sans text-justify mt-6 `}
            >
              Móveis planejados sob medida para quem valoriza o melhor.
            </h1>

            <p className="text-justify mt-4 text-muted-foreground">
              Somos uma marcenaria que planeja e executa projetos no ramo de
              móveis, trabalhamos tanto com projetos únicos que atendem
              necessidades específicas, como projetos de massificação que
              atendem a demanda do mercado.
            </p>

            <div className="flex justify-between items-center mt-4">
              <div className="flex gap-4 flex-wrap">
                <Button
                  className="w-fit rounded-full"
                  variant="outline"
                  asChild
                >
                  <Link href="/loja">
                    <ShoppingBasket /> Loja Virtual
                  </Link>
                </Button>

                <Button className="w-fit rounded-full group" variant="default">
                  Solicite agora um orçamento
                  <MoveRight className="size-4 group-hover:trawnslate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex justify-between gap-4 items-center">
            <h1
              className={`text-xl leading-[1.1] font-medium font-sans text-center`}
            >
              + de 17 anos de <br />
              experiência no mercado
            </h1>

            <h1
              className={`text-xl leading-[1.1] font-medium font-sans text-center`}
            >
              Qualidade & design
            </h1>

            <h1
              className={`text-xl leading-[1.1] font-medium font-sans text-center`}
            >
              Projetos 3D <br />
              sem compromisso
            </h1>
          </div>
        </div>

        <div className="rounded-lg overflow-hidden">
          <Image
            src="https://i.pinimg.com/1200x/ac/2e/05/ac2e05a976cdcfc568e4c7b8aba51be8.jpg"
            alt="Hero"
            width={400}
            height={400}
          />
        </div>
      </main>
    </section>
  );
}
