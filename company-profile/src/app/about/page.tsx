import { aboutHeader } from "@/assets";
import { CalltoActions } from "@/components";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <>
      <section className="w-full container mx-auto px-4 md:px-0">
        <div className="flex flex-col gap-20 md:gap-0 md:flex-row justify-between py-20">
          <div className="flex justify-start w-full md:w-[500px]">
            <h2 className="text-4xl md:text-5xl  font-bold">
              Realizing Document{" "}
              <span className="text-black/50">
                Digitization with Hedera Technology
              </span>
            </h2>
          </div>

          <div className="flex justify-end w-full md:w-[500px] items-end">
            <p className="text-lg">
              our commitment is to provide a secure, transparent, and trusted
              platform for managing and signing documents, paving the way for
              the future of digital solutions.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full container mx-auto ">
        <Image src={aboutHeader} alt="dummy" className="w-full h-full" />
      </section>

      <section className="w-full container mx-auto py-20 px-4 md:px-0">
        <div className="flex flex-col gap-8 md:gap-0 md:flex-row justify-between ">
          <div className="w-full md:w-3/6">
            <h2 className="text-3xl font-bold">
              Building a Digital Future of Document Digitalization with
              Blockchain Technology
            </h2>
          </div>

          <div className="w-full md:w-3/6 flex flex-col gap-4">
            <p>
              In an era of rapid digital transformation, HashSign is advancing
              document solutions using Hedera technology. As an innovative
              platform, we are committed to delivering secure, transparent, and
              efficient services for individuals and organizations. With a
              vision to lead the global shift in document digitalization, we
              uphold values of innovation, security, and customer satisfaction.
            </p>

            <p>
              Since our establishment in 2024, we have reached significant
              milestones, from launching groundbreaking products to forming
              strategic partnerships recognized worldwide. By leveraging Hedera
              technology and our professional expertise, we empower society and
              organizations with trusted and authentic document solutions.
            </p>

            <p>
              Join us in shaping the future of secure and seamless digital
              documentation. Here, your journey to better document management
              begins.
            </p>
          </div>
        </div>
      </section>

      <CalltoActions />
    </>
  );
};

export default page;
