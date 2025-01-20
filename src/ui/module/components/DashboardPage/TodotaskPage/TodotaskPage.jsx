"use client";
import Button from "@/ui/module/blocks/Button/Button";
import {
  LayoutGrid as GridIcon,
  LayoutDashboard,
  List as ListIcon,
} from "lucide-react";
import useScreenWidth from "@/ui/module/utils/UseScreenWidth/useScreenWidth";
import AnalysisCardContainer from "./AnalysisCard/AnalysisCardContainer";
import dynamic from "next/dynamic";
import Spinner from "@/ui/module/blocks/Spinner/Spinner";
import { useDispatch } from "react-redux";
import { toggleTask } from "@/redux/features/TaskSlice/TaskSlice";
const BoardContainer = dynamic(() => import("./Board/BoardContainer"), {
  loading: () => <Spinner />,
});
const Tab = dynamic(() => import("@/ui/module/blocks/Tab/Tab"), {
  loading: () => (
    <div className="relative flex flex-col sm:flex-row items-center justify-between sm:gap-0 gap-4 border-0 sm:border-b border-border">
      <div className="flex flex-row items-center justify-center gap-8 px-16 py-12 w-full sm:w-fit relative border-0 text-light">
        <div className="h-[36px] w-64 bg-gray-300 dark:bg-gray-700 rounded-md" />
        <div className="h-[36px] w-64 bg-gray-300 dark:bg-gray-700 rounded-md" />
      </div>
      <div className="flex flex-row gap-16 items-end justify-end w-full">
        <div className="h-[36px] w-full sm:w-64 bg-gray-300 dark:bg-gray-700 rounded-md" />
      </div>
    </div>
  ),
});

export default function TodotaskPage() {
  const mobilescreen = useScreenWidth(640);
  const dispatch = useDispatch();

  const tabs = [
    {
      id: "board",
      title: "Board View",
      icons: <LayoutDashboard size={18} />,
      content: <BoardContainer />,
    },
    {
      id: "list",
      title: "List View",
      icons: <ListIcon size={18} />,
      content: (
        <div className="flex flex-col gap-0 items-center justify-center">
          <svg
            viewBox="0 0 400 400"
            xmlns="http://www.w3.org/2000/svg"
            id="Coming-Soon-1--Streamline-Brooklyn"
            height="400"
            width="400"
          >
            <desc>
              Coming Soon 1 Streamline Illustration: https://streamlinehq.com
            </desc>
            <path
              d="m115.182 156.332 -1.788 20.418 153.244 -2.894 -0.854 -17.524 -150.602 0z"
              fill="#2563eb"
              stroke-width="2"
            ></path>
            <path
              d="M184.532 217.778c-6.124 0.524 -12.234 1.184 -18.35 1.778a63.56 63.56 0 0 1 -4.73 -16.52c6.74 -0.43 13.478 -0.898 20.246 -1.1a64.124 64.124 0 0 0 2.834 15.842Zm-43 -13.92c6.12 -0.078 12.34 -0.306 18.536 -0.722a63.15 63.15 0 0 0 4.614 16.574c-6.052 0.58 -12.456 1.09 -18.64 1.236a64.336 64.336 0 0 1 -4.512 -17.088Zm25.834 30.388q-6.758 0.228 -13.516 0.354a64.052 64.052 0 0 1 -7.2 -12.23c6.2 -0.176 12.4 -0.68 18.614 -1.284a75.016 75.016 0 0 0 7.076 12.936q-2.49 0.114 -4.984 0.2Zm6.576 -0.246a77.156 77.156 0 0 1 -7.176 -13.038c6.044 -0.6 12.098 -1.246 18.2 -1.756a58.6 58.6 0 0 0 6.7 13.8c-18.016 1.178 -17.724 0.794 -17.724 0.994Zm41.74 1.8c2.184 3.53 5.212 6.6 5.676 8.022 1.858 5.728 -7.936 -6.928 -8.574 -8.1 0.598 -0.054 2.898 -0.182 2.898 0.062Zm-6.944 -4.4c-5.858 0.562 -9.226 1.052 -14.98 1.47a0.718 0.718 0 0 1 -0.642 -0.302 53.8 53.8 0 0 1 -6.376 -12.6 0.71 0.71 0 0 1 0.44 -0.906c0.292 -0.102 12.108 -0.914 12.652 -0.95a0.736 0.736 0 0 0 -0.052 -1.468s-8.838 0.624 -13.23 0.964a0.706 0.706 0 0 1 -0.738 -0.5 66.616 66.616 0 0 1 -2.66 -14.466 0.714 0.714 0 0 1 0.662 -0.76c0.846 -0.056 13.282 -0.15 16.756 -0.174a0.716 0.716 0 0 1 0.71 0.6c0.6 3.62 3.366 13.614 4.354 17.186a0.738 0.738 0 0 0 1.426 -0.38c-0.928 -3.344 -3.686 -13.156 -4.262 -16.6a0.712 0.712 0 0 1 0.6 -0.816c0.036 0 0.072 -0.064 0.11 -0.064h16.6a0.662 0.662 0 0 1 0.706 0.546q0.296 1.926 0.678 3.83a0.724 0.724 0 0 0 1.418 -0.284q-0.32 -1.672 -0.6 -3.35a0.712 0.712 0 0 1 0.6 -0.812c0.2 -0.032 19.11 -0.2 17.908 -0.188a0.71 0.71 0 0 1 0.712 0.618 93 93 0 0 0 2.246 11.842 0.71 0.71 0 0 1 -0.7 0.896c-5.054 -0.11 -10.3 -0.078 -15.448 0.138a0.712 0.712 0 0 0 0.028 1.422c2.522 -0.026 6.524 -0.308 16.29 -0.094a0.716 0.716 0 0 1 0.658 0.498 61.816 61.816 0 0 0 4.904 11.346 0.714 0.714 0 0 1 -0.588 1.062c-3.696 0.154 -14.822 0.53 -16.68 0.63a0.718 0.718 0 0 1 -0.662 -0.366q-0.616 -1.116 -1.2 -2.246a0.706 0.706 0 0 0 -0.84 -0.356l-0.12 0.038a0.714 0.714 0 0 0 -0.464 0.898 0.712 0.712 0 0 1 0.024 0.366l-0.17 0.86a0.714 0.714 0 0 1 -0.472 0.536l-1.662 0.552a0.742 0.742 0 0 0 0.266 1.44q1.782 -0.114 3.562 -0.2a0.706 0.706 0 0 1 0.662 0.368c1.502 2.788 10.2 15.724 8.642 10.016 -0.158 -0.58 -2.72 -3 -6.618 -9.464a0.71 0.71 0 0 1 0.242 -0.974c0.368 -0.22 9.214 -0.35 17.084 -0.708a0.706 0.706 0 0 1 0.62 0.322c2.102 3.15 9.626 14.662 10.166 11.702 0.06 -0.696 -0.2 -0.642 -0.696 -1.314a108.032 108.032 0 0 1 -7.382 -9.786 0.71 0.71 0 0 1 0.556 -1.1c3.53 -0.174 12.2 -0.32 9.446 -1.99 -0.434 -0.264 -0.892 0.142 -11.102 0.648a0.716 0.716 0 0 1 -0.642 -0.342 57 57 0 0 1 -5.2 -11.4 0.712 0.712 0 0 1 0.45 -0.9c0.346 -0.114 15.838 0.546 16.288 0.564 0.934 0.038 0.93 -1.4 0 -1.448 -5.654 -0.23 -11.312 -0.478 -16.972 -0.642a0.712 0.712 0 0 1 -0.668 -0.516 89.368 89.368 0 0 1 -2.4 -12.2 0.704 0.704 0 0 1 0.628 -0.776c2.488 -0.264 23.7 0.6 19.464 -1.8 -0.5 -0.286 -0.142 0.116 -19.726 0.42a0.706 0.706 0 0 1 -0.716 -0.616c-0.472 -3.706 -0.53 -7.658 -1 -11.46a0.724 0.724 0 0 0 -0.322 -0.516c-2.072 -1.284 -0.32 8.898 -0.058 11.856a0.71 0.71 0 0 1 -0.642 0.772s-12.01 0.124 -17.988 0.16a0.712 0.712 0 0 1 -0.71 -0.62 89.9 89.9 0 0 1 -0.6 -11.552 0.704 0.704 0 0 0 -0.21 -0.508c-2.274 -2.2 -0.962 8.8 -0.64 11.896a0.708 0.708 0 0 1 -0.626 0.78c-0.024 0 -0.05 0.06 -0.074 0.06h-16.708a0.664 0.664 0 0 1 -0.704 -0.538c-0.678 -4.172 -0.892 -8.6 -1.522 -12.9a0.672 0.672 0 0 0 -0.272 -0.462c-2.276 -1.6 -0.03 9.968 0.374 13.182a0.708 0.708 0 0 1 -0.696 0.8c-5.438 0.048 -11 0.054 -16.52 0.2a0.706 0.706 0 0 1 -0.728 -0.66c-0.238 -3.874 0 -7.982 -0.248 -11.942a0.684 0.684 0 0 0 -0.32 -0.548c-1.984 -1.2 -0.86 9.556 -0.78 12.514a0.71 0.71 0 0 1 -0.684 0.73c-6.334 0.2 -12.646 0.564 -18.984 1a0.714 0.714 0 0 1 -0.758 -0.642 70.258 70.258 0 0 1 0.242 -12.954 0.73 0.73 0 0 0 -0.128 -0.488c-2.2 -3.07 -1.734 10.224 -1.486 13.514a0.712 0.712 0 0 1 -0.642 0.764c-5.6 0.372 -11.456 0.552 -17.134 0.642a0.71 0.71 0 0 1 -0.718 -0.642 60.736 60.736 0 0 1 0.4 -13.622 0.7 0.7 0 0 0 -0.08 -0.448c-2.184 -4 -2.028 10.626 -1.768 14.054a0.702 0.702 0 0 1 -0.644 0.756c-3.738 0.294 -17.27 -0.884 -15.95 1.168a0.7 0.7 0 0 0 0.55 0.302c5.134 0.266 10.476 -0.112 15.662 -0.074a0.716 0.716 0 0 1 0.7 0.626 65.4 65.4 0 0 0 3.934 15.528 0.71 0.71 0 0 1 -0.642 0.964c-4.446 0.05 -9.052 -0.168 -13.584 -0.54a0.678 0.678 0 0 0 -0.522 0.174c-2.416 2.278 12.4 1.726 15.274 1.754a0.698 0.698 0 0 1 0.642 0.422 65.34 65.34 0 0 0 6.052 10.8 0.71 0.71 0 0 1 -0.182 0.986c-0.73 0.5 -13.432 -0.816 -11 1.45a0.71 0.71 0 0 0 0.462 0.182c3.976 0.106 8.132 -0.14 12.146 -0.16a0.692 0.692 0 0 1 0.566 0.276c2.152 2.83 11.652 13.416 12.216 10.526 0 -0.614 -0.276 -0.534 -0.878 -1.086a59.812 59.812 0 0 1 -8.79 -8.622 0.71 0.71 0 0 1 0.53 -1.164c17.764 -0.4 16.758 -0.782 17.152 -0.2 2.046 2.956 10.91 12.836 11.632 10.186 0.094 -0.744 -0.276 -0.732 -0.934 -1.242a39.726 39.726 0 0 1 -8.458 -8.238 0.71 0.71 0 0 1 0.096 -1c0.508 -0.422 1.262 0.058 16.336 -1.086a0.712 0.712 0 0 1 0.624 0.286c2.358 3.166 11.4 14.048 11.83 11.2 0.024 -0.642 -0.25 -0.58 -0.814 -1.2a86.772 86.772 0 0 1 -8.732 -9.412 0.714 0.714 0 0 1 0.484 -1.152c3.65 -0.366 8.4 -0.69 12.32 -0.964a0.85 0.85 0 0 0 0.79 -0.838Z"
              fill="#9CA3AF"
              stroke-width="2"
            ></path>
            <path
              d="M215.248 221.882a20.376 20.376 0 0 1 1.638 -3.988 21.838 21.838 0 0 0 2.374 3.488c0.212 0.15 1.97 -0.37 3.95 -0.322 -0.86 1.388 -1.97 3.166 -1.97 3.166a22.266 22.266 0 0 1 1.064 3.612 18.6 18.6 0 0 0 -4.064 -1.354 36.3 36.3 0 0 0 -3.614 1.8 17 17 0 0 1 0.456 -3.622l-3.164 -1.8Z"
              fill="#2563eb"
              stroke-width="2"
            ></path>
            <path
              d="M227 232.344c13.132 -13.362 -5.698 -26.334 -17.136 -19.454 -12.36 8.778 -2.984 27.742 10.85 24.928 5.282 -0.908 4.782 -5 1.586 -3.8 -9.282 4.692 -18.222 -6 -14.296 -14.656 3.53 -8.892 17.97 -6.354 20.4 2.17 2.396 3.656 -8.05 12.332 -1.404 10.812Z"
              fill="#2563eb"
              stroke-width="2"
            ></path>
            <path
              d="M175.236 197.388c-5.456 -4.102 -4.278 -2.43 -1.484 -6.822 2.552 -2.436 -0.544 -4.75 -2.2 -1.874 -1.14 1.056 -2.032 3.96 -3 3.53 -1.748 -1.2 -4.698 -4.21 -6.074 -1.702 -1.216 2.246 6.254 3.18 4.2 5.026a52.2 52.2 0 0 0 -3.94 5.84c0.782 3.258 3.362 0.376 4.258 -1.308 1.244 -1.152 2.018 -4.384 3.2 -2.95 1.55 0.962 2.6 2.512 4.446 3.038a1.58 1.58 0 0 0 0.594 -2.778Z"
              fill="#2563eb"
              stroke-width="2"
            ></path>
            <path
              d="M196.6 196.364c-0.674 -0.962 -4.448 -2.516 -3.656 -3.308 1.24 -1.692 3.8 -2.818 3.4 -4.612 -2.098 -3.6 -4.518 3.354 -6.418 2.984 -2.074 -1.818 -5.586 -3.552 -4.6 0.27 0.378 0.902 3.45 1.55 2.644 2.4 -1.062 1.444 -3.72 2.922 -2.246 4.624 1.762 1.664 3.286 -1.97 4.612 -2.93 1.148 -0.752 3.474 2.752 4.876 2.922 1.37 0.26 2.566 -1.346 1.388 -2.35Z"
              fill="#2563eb"
              stroke-width="2"
            ></path>
            <path
              d="M214.094 189.16c-1.676 1.23 -3.678 5.456 -4.934 3.4 -1.338 -1.082 -2.052 -2 -3.53 -3.052a1.462 1.462 0 0 0 -1.304 2.612c3.06 3.144 4.866 2.73 2.336 4.914 -2.058 1.646 -2.776 3.936 -0.04 4a26.956 26.956 0 0 0 3.736 -3.7c1.55 0.964 4.076 4.214 5.34 2.568 1.444 -2.074 -1.824 -3.112 -3.02 -4.386 -0.924 -0.942 4.094 -3.97 3.85 -5.17a1.442 1.442 0 0 0 -2.434 -1.186Z"
              fill="#2563eb"
              stroke-width="2"
            ></path>
            <path
              d="M238.444 195.318c-5.486 -3.154 -2.51 -2.186 -0.514 -6.02 0.23 -0.742 -0.322 -1.302 -1.046 -1.566 -2.478 -0.812 -3.37 5.084 -5.134 3.248 -1.9 -0.964 -6.12 -3.284 -7 -1.544a1.448 1.448 0 0 0 0.8 2.15c1 0.45 5.776 1.746 4.768 2.496 -1.486 1.84 -6.096 4.968 -2.068 5.858 5.224 -3.034 3.042 -6.524 8.022 -2.568 1.838 1.806 3.928 -0.548 2.172 -2.054Z"
              fill="#2563eb"
              stroke-width="2"
            ></path>
            <path
              d="M154.082 211.328c1.668 -1.656 5.8 -5.278 1.282 -5.282 -1.574 0.62 -2.784 3.72 -4.08 3.456 -1.8 -0.814 -4.272 -3.2 -5.626 -1.236a1.238 1.238 0 0 0 0.32 1.702c0.664 0.714 4.268 1.428 3.488 2.314 -1.244 1.976 -3.462 3.616 -3.702 6 2.088 3.754 4.878 -3.706 6.418 -4.752 1.892 1.074 3.324 3.138 5.33 4.116 4.71 -0.994 -2.028 -5.124 -3.43 -6.318Z"
              fill="#2563eb"
              stroke-width="2"
            ></path>
            <path
              d="M256.59 195c-0.6 -0.6 -4.442 -2.182 -3.4 -2.74 1.966 -1.438 5.866 -3.822 2.266 -5.024a24.228 24.228 0 0 0 -4.878 3.4c-0.85 -0.526 -1.646 -2.16 -2.958 -2.272 -1.98 0.4 -1.656 2.224 -0.152 3.332 0.76 0.91 0.87 0.818 0.54 1.104 -0.248 -0.822 -0.064 -0.642 0.32 -0.286 -1.588 1.648 -3.4 2.528 -4.256 4.418 1.188 5.074 4.934 -2.846 6.82 -2.266 6.87 5.838 7.066 1.234 5.698 0.334Z"
              fill="#2563eb"
              stroke-width="2"
            ></path>
            <path
              d="M140.482 217.71c-1.284 -1.574 -6.482 -4.062 -5.626 -4.73 1.262 -1.508 3.126 -2.444 4.07 -4.366a1.492 1.492 0 0 0 -2.466 -1.226c-1.348 1.298 -2.986 2.888 -4.4 4.27 -0.426 -0.262 -1.132 -0.686 -1.838 -1.09 -1.948 -1.444 -4.242 -1.83 -3.976 0.782 0.77 1.19 2.526 1.506 3.69 2.4 -1 1.316 -3.26 2.44 -3.672 4.266 1.566 4.546 4.674 -2.84 6.538 -2.458 2.372 1.324 3.944 3.382 6.542 4.554a1.4 1.4 0 0 0 1.138 -2.402Z"
              fill="#2563eb"
              stroke-width="2"
            ></path>
            <path
              d="M53.346 224.424c2.096 -3.052 -2.864 -7.568 -5.958 -4.06 -2.324 3.162 2.772 7.824 5.958 4.06Zm-5 -2.484c0.4 -2.172 5.334 -1.034 3.418 1.79 -1.392 1.136 -3.208 0.47 -3.414 -1.79Z"
              fill="#9CA3AF"
              stroke-width="2"
            ></path>
            <path
              d="M70.746 226.962c4.574 -3.288 2 -8.022 -2.77 -7.618 -3.1 1.944 -2.434 8.304 2.77 7.618Zm-2.422 -5.692a0.8 0.8 0 0 0 0.2 -0.42c7.72 0.792 -2.398 9.338 -0.2 0.42Z"
              fill="#9CA3AF"
              stroke-width="2"
            ></path>
            <path
              d="M92.34 232c0.292 -3.488 -5.982 -6.312 -7.756 -1.716s6.95 7.39 7.756 1.716Zm-6.302 -0.57c-0.286 -2.664 4.746 -2.51 4.63 0.514 -0.356 2.576 -3.784 2.142 -4.63 -0.524Z"
              fill="#9CA3AF"
              stroke-width="2"
            ></path>
            <path
              d="M152.746 288.332c2.504 -1.474 1.926 -8.52 -2.83 -7.018 -4.116 1.486 -1.932 7.938 2.83 7.018Zm-1.2 -5.568c1.23 0.03 1.978 4.172 -0.298 4.018 -2.272 -0.452 -2.51 -4.284 0.294 -4.018Z"
              fill="#9CA3AF"
              stroke-width="2"
            ></path>
            <path
              d="M302.02 256.956c-35.1 -39.846 -32.84 -60.502 -34.468 -100.762 -3.502 -2.112 -8.8 -1.438 -13.43 -1.55a8.05 8.05 0 0 0 -0.698 -5.4c-2.97 -9.568 -13.632 -9.354 -18.7 -2.314 -3.292 -6.932 -14.788 -8.376 -19.112 -0.568 -2.686 -8.024 -15.818 -8.042 -19.862 -0.322 -3.106 -7 -13.092 -7.822 -18.04 -1.344 -4.056 -6.02 -14.426 -5.356 -18.468 1.374 -3.63 -6.168 -13.122 -5.24 -17.2 0.868 -4 -8.664 -18.716 -7.47 -20.098 2.686a14.82 14.82 0 0 0 0.532 5.216q-4.112 0.06 -8.228 0.108c-5.504 13.478 -3.032 32.024 -3.25 47.36 -0.466 26 12.868 45.028 31.656 59.09 6.778 4.172 40 0.178 44.524 0.12 51.51 -0.666 80.182 -2.074 96.066 -2.09 0.072 1.95 0.566 5.244 -2.246 5.266 -34.95 0.272 -68.39 1.788 -102.984 2.182 -80.868 -0.584 -60.786 8.084 -67.69 -23.364 -6.6 -55.696 1.89 -91.526 -2.6 -88.922 -2.486 0.612 -1.058 4.014 -1.642 6.266 -1.926 32.688 -2.05 64.476 3.35 96.688 2.5 10.812 0 13.228 7.502 12.57 24.71 -0.034 152.43 -1.644 162.4 -2.4 -17.35 11.768 -162.08 8.572 -167.624 8.966 -10.146 0.722 -12.16 -0.148 -9.27 -95.276 0.146 -4.784 0.48 -23.878 -1.028 -25.512 -1.942 2.462 -4.496 32.584 -3.868 68.86 -13.6 -11.8 -36.096 -14.708 -53.682 -13.574 -5.458 0.352 -12.044 -0.12 -16.72 3.17 -3.132 15.082 -6.418 30.73 -9.678 46.364 -15.8 71.034 -9.662 24.466 49.176 59.366 27.222 19.384 42.374 48.29 77.032 47.668 4.066 -9.904 5.834 -21 9.306 -31.6 5.718 -22.664 15.76 -50.4 15.106 -56.144 25.132 -0.63 98.968 -3.22 112.102 -3.872 2.074 0.568 1.81 -5.676 1.178 -8.62 6.156 -0.55 4.256 -8.022 4.172 -8.094 18.394 0.002 17.292 0.17 16.484 -2.46ZM140.092 364.62c-61.666 -12.574 -47.38 -57.442 -127.506 -64.854 9.4 -43.62 13.886 -65.148 16.1 -75.882 1.384 -6.704 5.146 -8.774 14.4 -9.4 35.874 -2.458 48.876 10.874 54.546 13.96 0.234 10.17 0.724 20.758 1.55 31.306 -1.902 1.748 -2.87 7.762 -4.4 10.084 -18.484 -20.788 -22.266 -10.946 -19.472 -20.746 3.376 -15.244 -1.766 -2.436 -2.75 3.818a99.112 99.112 0 0 0 -24.3 -5.706c0.212 -3.144 4.85 -12.668 1.884 -12.47 -4.47 8.15 0.742 13.74 -10.72 12.352 -2.534 2.634 4.062 1.114 6.786 1.6 -4.336 13.246 -0.564 16.134 -10.86 13.93 -2.566 2.266 3.932 1.686 6.528 2.526 -5.34 20.774 -1.232 12.93 -15.544 14.964 -0.2 3 7.974 0.32 11.17 1.646 -0.238 2.314 -4.8 13.6 -1.236 10.988 2.19 -16.688 7.506 -9.066 19.322 -7.022 11.184 1.312 1.628 9.626 1.348 17.026 3.258 0.742 4.23 -11.414 6.05 -14.032 25.87 17.55 17.306 15.856 16.8 23.128 2.3 0.6 2.224 -3.36 3.546 -5.776 21.424 25.222 19.816 17.308 16.2 29.958 2.054 3.444 2.986 -6.33 4.098 -8.554 17.292 12.13 20.026 5.736 14.94 17.6 1.428 3.658 3.31 -4.638 4.332 -7.214 2.426 0.77 14.2 6.066 11.524 2.246 -17.872 -3.128 -7.676 -9.74 -6.098 -21.754 2.436 0.838 14.46 6.332 11.782 2.466 -16.6 -3.852 -9.782 -5.812 -7.702 -16.968 3.89 1.256 15.312 7.148 15.024 3.926 -9.114 -5.26 -17.674 -1.284 -12.548 -12.704 -1.816 -3.15 -2.49 3.898 -3.528 6.548 -29.152 -12.034 -8.896 -16.092 -15.638 -18.906q-1.252 3.8 -2.464 7.6c-20.944 -22.188 -17.6 -17.78 -13.812 -27.294 0.36 4.228 0.776 8.442 1.252 12.612 0.2 2.276 3.978 4.902 6.096 4.926 20.042 0.2 39.526 -0.044 58.762 -0.506 -15.646 50.934 -21.88 85.746 -25.462 84.578Zm-73.43 -92.494a103.276 103.276 0 0 0 -22.818 -8.2q2 -7.56 4 -15.124c32.356 5.344 23.914 3.044 18.818 23.324Zm6.924 -17.046c0.218 0.092 0.426 0.184 0.62 0.278 27.78 17.528 18.442 15.97 14.062 32.04 -24.79 -20.858 -21.25 -7.756 -14.682 -32.318Zm-19.224 13.57c17.526 5.306 10.2 6.348 7.668 17.834a96.564 96.564 0 0 0 -22.504 -6.102c5.134 -16.632 0.038 -16.494 14.836 -11.732Zm13.3 5.8c26.536 16.254 19.422 13.68 15.038 28.586a112.76 112.76 0 0 0 -9.22 -8.94c-14.514 -9.484 -8.578 -7.738 -5.818 -19.65Zm21.33 15.68c24.448 21.882 19.4 12.49 13.748 34.658a93.078 93.078 0 0 1 -11.478 -12.064c-11.262 -10.594 -5.298 -11.184 -2.262 -22.598Zm20.454 17.706c3.14 4 20 8.774 16.746 12.14 -1.4 5 -2.8 9.92 -4.426 15.706 -24.58 -10.746 -16.508 -9.738 -12.32 -27.85Zm4.564 -14.626c0.306 0.236 0.6 0.472 0.922 0.694 18.88 13.314 16.934 4.812 12.332 22.282 -22.396 -10.756 -17.098 -8.8 -13.254 -22.986Zm-5.41 11.946c-24.16 -20.19 -19.472 -13.866 -13.236 -32.336 2.25 2.47 4.4 5.036 6.61 7.524 13.826 15.52 10.4 10.856 6.626 24.812ZM250.888 154.4q-7.256 -0.32 -14.508 -0.488a7.248 7.248 0 0 0 -0.44 -3.582c7.94 -10.974 16.55 -3.836 14.948 4.07Zm-17.3 -0.556c-5.134 -0.118 -15.6 0.456 -15.882 -0.414 0.046 -15.498 16.63 -8.83 15.882 0.418Zm-19.89 -0.264q-8.022 -0.036 -16.05 0.02a9.232 9.232 0 0 0 -0.642 -3.938c8.292 -13.29 17.53 -4.476 16.692 3.922Zm-33.216 -7.806c8.892 -6.706 14.964 0.43 13.956 7.84q-7.518 0.056 -15.034 0.176c-0.126 -2.612 -0.822 -5.22 1.078 -8.016Zm-4.056 8.074c-4.968 0.082 -9.936 0.156 -14.902 0.25a8.058 8.058 0 0 0 -0.864 -5.134c9.598 -11.494 17.14 -3.322 15.766 4.884Zm-18.172 0.328 -14.686 0.268a9.786 9.786 0 0 0 -0.32 -4.132c7.874 -10.844 16.398 -3.954 15.006 3.864Zm-23.956 -10c7.516 3.418 8.212 7.06 6.418 10.352q-7.894 0.156 -15.786 0.28a15.702 15.702 0 0 0 -0.092 -4.914c-0.638 -4.494 5.134 -7.694 9.46 -5.728Zm113.284 112.752c-95.8 1.772 -99.836 5.4 -103.99 1.6 -37.034 -28.796 -30.272 -57.34 -28.696 -96.758 0.77 -4.29 0.126 -4 5.49 -4.02q9.07 -0.112 18.07 -0.276a13.986 13.986 0 0 1 -5.934 4.916c-0.464 -1.366 -1.376 -2.294 -2.426 -2.294 -1.518 0 -2.75 1.944 -2.75 4.344s1.232 4.346 2.75 4.346c1.298 0 2.384 -1.42 2.674 -3.328a12.698 12.698 0 0 0 10.064 -8.058l14.418 -0.274a12.466 12.466 0 0 1 -5.876 4.722 3.474 3.474 0 1 0 1.098 3.282 17.422 17.422 0 0 0 8.246 -8.072q7.414 -0.138 14.8 -0.264c-2.172 4.024 -4.458 5.118 -6.242 5.526a2.928 2.928 0 0 0 -2.4 -1.35 3.506 3.506 0 0 0 0 6.95 3.136 3.136 0 0 0 2.93 -2.544C172.96 164.4 177.076 161.4 178 159.084a7.07 7.07 0 0 0 1.154 -2.352q7.256 -0.112 14.514 -0.182a9.762 9.762 0 0 1 -5.13 4.768 2.612 2.612 0 0 0 -2.104 -1.222c-1.6 0 -2.898 1.75 -2.898 3.908s1.298 3.91 2.898 3.91a3.278 3.278 0 0 0 2.84 -3.126 10.872 10.872 0 0 0 7.894 -8.266q7.902 -0.06 15.81 -0.036a15.956 15.956 0 0 1 -7.2 5.498 3.042 3.042 0 1 0 2.03 3.508c3.518 -1.6 8.124 -5.944 8.42 -9q8.278 0.048 16.57 0.222a15.2 15.2 0 0 1 -8.666 5.118 3.662 3.662 0 1 0 3.144 3.618l0 -0.212a17.744 17.744 0 0 0 8.436 -8.476c16.658 0.4 10.762 0.368 14.13 0.53a20.66 20.66 0 0 1 -5.964 4.814A3.62 3.62 0 1 0 246 166.23a16.4 16.4 0 0 0 7.25 -8.838c5.266 0.072 11.812 0.07 11.552 1.834 0.446 54.072 8.986 67.55 33.028 97.27 -16.752 -0.184 -33.506 0.104 -50.248 0.422Z"
              fill="#9CA3AF"
              stroke-width="2"
            ></path>
            <path
              d="M389.716 59.826c-68.92 21.418 -56.988 -1.282 -69.08 21.53 -44.294 -15.144 -33 -39.538 -45.722 -20.942 -13.158 17.378 -30.076 27.754 -48.456 37.848 31.834 53.472 170.636 24.448 163.258 -38.436Zm-60.872 13.302a0.372 0.372 0 0 0 0.064 -0.15c0.02 0.054 -0.01 0.106 -0.064 0.15ZM245.772 112.08a116.102 116.102 0 0 1 -15.172 -12.68c19.65 -9.872 37.484 -23.558 50.556 -41.84a73.764 73.764 0 0 0 37.618 26.516c-16.69 21.486 -46.924 49.79 -73.002 28.004Zm101.566 -0.18c-21.838 9.972 -46.634 10.948 -70.6 9.724 22.948 -7.684 40.388 -28.498 52.778 -48.052a193 193 0 0 0 58.626 -9.862c-3.304 21.93 -20.91 39.104 -40.804 48.19Z"
              fill="#9CA3AF"
              stroke-width="2"
            ></path>
            <path
              d="M154.91 54.8c-20.27 -17.258 -15.838 -27.8 -22.2 -19.928 -18.2 28.45 -99.368 24.358 -57.548 65.068 28.56 33.4 27.55 38.4 31.144 30.2C121.368 101.22 172.122 106.098 179.8 76.052c-7.79 -6.62 -16.762 -14.336 -24.89 -21.252Zm-6.4 44.428c-16.3 6.81 -36.482 12.6 -45.234 29.934 -11.6 -15.558 -27.276 -30.508 -37.424 -47.096 7.86 -25.968 55.228 -20.654 69.488 -45.36 25.86 41.856 67.782 35.26 13.16 62.518Z"
              fill="#9CA3AF"
              stroke-width="2"
            ></path>
            <path
              d="M73.92 74.14a0.812 0.812 0 0 0 -0.482 0.454c-8.586 10.224 12.276 3.3 0.482 -0.454Zm0.732 4.514c-0.818 0.4 -2.67 -0.4 -0.948 -3.032 1.096 -0.282 3.296 1.04 0.948 3.032Z"
              fill="#9CA3AF"
              stroke-width="2"
            ></path>
            <path
              d="M84.616 68.694c-2.8 -0.922 -3.922 4.492 -0.322 5.522 4.138 0.984 5.34 -5.39 0.322 -5.522Zm1.666 3.06c-0.378 2.658 -5.388 -2.02 -1.15 -1.34 -0.256 0.372 1.388 -0.344 1.15 1.34Z"
              fill="#9CA3AF"
              stroke-width="2"
            ></path>
            <path
              d="M94.388 64.05c-3.078 1.464 -0.138 6.466 3.346 4.492a2.85 2.85 0 0 0 -3.346 -4.492Zm2.2 3.308c-1.092 0.8 -3.326 -2.246 -0.514 -1.98 0.666 0.402 1.378 0.822 0.512 1.98Z"
              fill="#9CA3AF"
              stroke-width="2"
            ></path>
            <path
              d="M104.894 60.674c-3.122 0.732 -1.718 7.13 2.654 5.084a2.962 2.962 0 0 0 -2.654 -5.084Zm1.848 3.688c-1.6 1.174 -3.626 -2.978 -0.16 -1.852a1.722 1.722 0 0 1 0.16 1.852Z"
              fill="#9CA3AF"
              stroke-width="2"
            ></path>
            <path
              d="M115.056 56.856c-3.51 1.12 -0.32 7.126 3.492 3.892 1.62 -2.028 -0.572 -4.506 -3.492 -3.892Zm1.906 3.06c-1.632 0.934 -3.452 -2.55 0.258 -1.222 0.22 0.28 0.436 0.542 -0.258 1.222Z"
              fill="#9CA3AF"
              stroke-width="2"
            ></path>
            <path
              d="M124.17 51.034c-3.8 2.324 1.498 7.93 3.95 3.178a2.816 2.816 0 0 0 -3.95 -3.178Zm2.2 3.186c-1.244 1.284 -3.6 -2.216 -0.452 -1.832 0.466 0.552 0.882 0.764 0.45 1.832Z"
              fill="#9CA3AF"
              stroke-width="2"
            ></path>
            <path
              d="M131.646 45.7c-3.506 0.97 -0.452 6.098 3.082 4.038 1.652 -1.738 0.272 -4.964 -3.082 -4.038ZM133.8 48.4c-0.2 0.578 -2.342 0 -2.082 -0.898 0.25 -0.244 2.306 -1.05 2.082 0.898Z"
              fill="#9CA3AF"
              stroke-width="2"
            ></path>
            <path
              d="M282.214 75.914c3.286 2.704 7.382 -3.552 3.438 -4.274 -1.978 -2.67 -6.98 1.36 -3.438 4.274Zm2.24 -3.434a0.766 0.766 0 0 0 0.732 0.02 0.636 0.636 0 0 0 0.4 0.496c0.414 4.178 -6.004 -0.09 -1.132 -0.516Z"
              fill="#9CA3AF"
              stroke-width="2"
            ></path>
            <path
              d="M294.04 85.124c4.762 2.586 6.418 -2.488 2.99 -5.912 -3.696 -1.388 -6.704 2.886 -2.99 5.912Zm-0.112 -3.666c0.898 -2.692 5.426 1.416 2.412 2.824 -1.618 -0.42 -2.102 -0.352 -2.412 -2.824Z"
              fill="#9CA3AF"
              stroke-width="2"
            ></path>
            <path
              d="M307.34 91.682c2.738 1.468 7.702 -2.056 3.562 -4.944 -3.702 -1.294 -8.124 1.742 -3.562 4.944Zm0.4 -3.58c2.508 -1.312 5.2 3.5 -0.106 1.906a1.088 1.088 0 0 1 0.096 -1.906Z"
              fill="#9CA3AF"
              stroke-width="2"
            ></path>
          </svg>
          <h1 className="text-md text-light">Coming Soon...</h1>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-24 w-full h-full p-12 overflow-y-auto">
      <AnalysisCardContainer />
      <Tab
        tabs={tabs}
        component={
          <Button
            text="New Task"
            width={mobilescreen ? "full" : "fit"}
            onClick={() => dispatch(toggleTask())}
          />
        }
      />
    </div>
  );
}
