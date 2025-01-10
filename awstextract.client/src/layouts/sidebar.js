"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import clsx from "clsx";

export default function Sidebar({ responseData }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const currentPathname = usePathname();

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      {/* Sidebar */}
      <div
        className={clsx(
          "sticky inset-y-0 start-0 z-[60] bg-blue-600 lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 dark:bg-neutral-800 dark:border-neutral-700",
          isExpanded ? "w-64" : "w-16",
          "h-full transition-all duration-300"
        )}
        role="dialog"
        aria-label="Sidebar"
      >
        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="p-4 text-gray-300 hover:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Content */}
        <nav
          className="hs-accordion-group p-2 w-full flex flex-col flex-wrap overflow-hidden"
          data-hs-accordion-always-open
        >
          <ul className="flex flex-col space-y-1">
            <li>
              <Link
                href="/"
                className={clsx(
                  "flex items-center  h-10 gap-x-3.5 py-2 px-2.5  text-sm text-white rounded-md hover:bg-white/10 focus:outline-none focus:bg-white/10  dark:text-white",
                  currentPathname === "/"
                    ? "bg-white/10 dark:bg-neutral-700"
                    : "bg-transparent dark:bg-transparent"
                )}
                title="AWS Textract"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  className="size-5"
                  viewBox="0 0 16 16"
                >
                  <path d="M10.813 11.968c.157.083.36.074.5-.05l.005.005a90 90 0 0 1 1.623-1.405c.173-.143.143-.372.006-.563l-.125-.17c-.345-.465-.673-.906-.673-1.791v-3.3l.001-.335c.008-1.265.014-2.421-.933-3.305C10.404.274 9.06 0 8.03 0 6.017 0 3.77.75 3.296 3.24c-.047.264.143.404.316.443l2.054.22c.19-.009.33-.196.366-.387.176-.857.896-1.271 1.703-1.271.435 0 .929.16 1.188.55.264.39.26.91.257 1.376v.432q-.3.033-.621.065c-1.113.114-2.397.246-3.36.67C3.873 5.91 2.94 7.08 2.94 8.798c0 2.2 1.387 3.298 3.168 3.298 1.506 0 2.328-.354 3.489-1.54l.167.246c.274.405.456.675 1.047 1.166ZM6.03 8.431C6.03 6.627 7.647 6.3 9.177 6.3v.57c.001.776.002 1.434-.396 2.133-.336.595-.87.961-1.465.961-.812 0-1.286-.619-1.286-1.533M.435 12.174c2.629 1.603 6.698 4.084 13.183.997.28-.116.475.078.199.431C13.538 13.96 11.312 16 7.57 16 3.832 16 .968 13.446.094 12.386c-.24-.275.036-.4.199-.299z" />
                  <path d="M13.828 11.943c.567-.07 1.468-.027 1.645.204.135.176-.004.966-.233 1.533-.23.563-.572.961-.762 1.115s-.333.094-.23-.137c.105-.23.684-1.663.455-1.963-.213-.278-1.177-.177-1.625-.13l-.09.009q-.142.013-.233.024c-.193.021-.245.027-.274-.032-.074-.209.779-.556 1.347-.623" />
                </svg>
                <span
                  className={clsx(
                    "text-nowrap",
                    isExpanded ? "visible" : "invisible"
                  )}
                >
                  AWS Textract
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/celebridades"
                className={clsx(
                  "flex items-center  h-10 gap-x-3.5 py-2 px-2.5 text-sm text-white rounded-md hover:bg-white/10 focus:outline-none focus:bg-white/10 dark:text-white",
                  currentPathname === "/celebridades"
                    ? "bg-white/10 dark:bg-neutral-700"
                    : "bg-transparent dark:bg-transparent"
                )}
                title="AWS Rekognition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  className="size-5"
                  viewBox="0 0 16 16"
                >
                  <path d="M10.813 11.968c.157.083.36.074.5-.05l.005.005a90 90 0 0 1 1.623-1.405c.173-.143.143-.372.006-.563l-.125-.17c-.345-.465-.673-.906-.673-1.791v-3.3l.001-.335c.008-1.265.014-2.421-.933-3.305C10.404.274 9.06 0 8.03 0 6.017 0 3.77.75 3.296 3.24c-.047.264.143.404.316.443l2.054.22c.19-.009.33-.196.366-.387.176-.857.896-1.271 1.703-1.271.435 0 .929.16 1.188.55.264.39.26.91.257 1.376v.432q-.3.033-.621.065c-1.113.114-2.397.246-3.36.67C3.873 5.91 2.94 7.08 2.94 8.798c0 2.2 1.387 3.298 3.168 3.298 1.506 0 2.328-.354 3.489-1.54l.167.246c.274.405.456.675 1.047 1.166ZM6.03 8.431C6.03 6.627 7.647 6.3 9.177 6.3v.57c.001.776.002 1.434-.396 2.133-.336.595-.87.961-1.465.961-.812 0-1.286-.619-1.286-1.533M.435 12.174c2.629 1.603 6.698 4.084 13.183.997.28-.116.475.078.199.431C13.538 13.96 11.312 16 7.57 16 3.832 16 .968 13.446.094 12.386c-.24-.275.036-.4.199-.299z" />
                  <path d="M13.828 11.943c.567-.07 1.468-.027 1.645.204.135.176-.004.966-.233 1.533-.23.563-.572.961-.762 1.115s-.333.094-.23-.137c.105-.23.684-1.663.455-1.963-.213-.278-1.177-.177-1.625-.13l-.09.009q-.142.013-.233.024c-.193.021-.245.027-.274-.032-.074-.209.779-.556 1.347-.623" />
                </svg>
                <span
                  className={clsx(
                    "text-nowrap",
                    isExpanded ? "visible" : "invisible"
                  )}
                >
                  AWS Rekognition
                </span>
              </Link>
            </li>
          </ul>
        </nav>
        {/* End Content */}
      </div>
      {/* End Sidebar */}
    </>
  );
}
