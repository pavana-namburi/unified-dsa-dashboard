package com.example.demo;

import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Service
public class DashboardService {

    private final LeetCodeService leetCodeService;
    private final GfgService gfgService;

    public DashboardService(LeetCodeService leetCodeService, GfgService gfgService) {
        this.leetCodeService = leetCodeService;
        this.gfgService = gfgService;
    }

    public Map<String, Object> getDashboard(String leetcodeUsername, String gfgUsername) {
        System.out.println("[Dashboard Service] Fetching aggregated stats for LeetCode: " + leetcodeUsername
                + ", GFG: " + gfgUsername);

        // Fetch data from LeetCode service
        LeetCodeStatsResponse leetcodeStats = null;
        try {
            if (leetcodeUsername != null && !leetcodeUsername.isEmpty()) {
                System.out.println("[Dashboard Service] Fetching LeetCode stats...");
                leetcodeStats = leetCodeService.getUserStats(leetcodeUsername);
                System.out.println("[Dashboard Service] LeetCode stats fetched successfully");
            }
        } catch (Exception e) {
            System.err.println("[Dashboard Service] Failed to fetch LeetCode stats: " + e.getMessage());
        }

        // Fetch data from GFG service
        GfgStatsResponse gfgStats = null;
        try {
            if (gfgUsername != null && !gfgUsername.isEmpty()) {
                System.out.println("[Dashboard Service] Fetching GFG stats...");
                gfgStats = gfgService.getGfgStats(gfgUsername);
                System.out.println("[Dashboard Service] GFG stats fetched successfully");
            }
        } catch (Exception e) {
            System.err.println("[Dashboard Service] Failed to fetch GFG stats: " + e.getMessage());
        }

        // Calculate combined stats
        int lcTotal = leetcodeStats != null ? leetcodeStats.getTotalSolved() : 0;
        int lcEasy = leetcodeStats != null ? leetcodeStats.getEasy() : 0;
        int lcMedium = leetcodeStats != null ? leetcodeStats.getMedium() : 0;
        int lcHard = leetcodeStats != null ? leetcodeStats.getHard() : 0;

        int gfgTotal = gfgStats != null ? gfgStats.getTotalSolved() : 0;
        int gfgEasy = gfgStats != null ? gfgStats.getEasy() : 0;
        int gfgMedium = gfgStats != null ? gfgStats.getMedium() : 0;
        int gfgHard = gfgStats != null ? gfgStats.getHard() : 0;

        int totalCombined = lcTotal + gfgTotal;
        int combinedEasy = lcEasy + gfgEasy;
        int combinedMedium = lcMedium + gfgMedium;
        int combinedHard = lcHard + gfgHard;

        System.out.println("[Dashboard Service] Combined stats - Total: " + totalCombined + ", Easy: "
                + combinedEasy + ", Medium: " + combinedMedium + ", Hard: " + combinedHard);

        // Create combined stats object
        Map<String, Object> combined = new HashMap<>();
        combined.put("total", totalCombined);
        combined.put("easy", combinedEasy);
        combined.put("medium", combinedMedium);
        combined.put("hard", combinedHard);

        // Create and return unified response
        Map<String, Object> dashboard = new HashMap<>();
        dashboard.put("leetcode", leetcodeStats);
        dashboard.put("gfg", gfgStats);
        dashboard.put("combined", combined);

        return dashboard;
    }
}