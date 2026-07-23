"use client";

import { getGitHubStars } from "@/lib/github";
import { useQuery } from "@tanstack/react-query";

export const useDesigns = () => useQuery({
    queryKey: ['github'],
    queryFn: async () => await getGitHubStars()
});