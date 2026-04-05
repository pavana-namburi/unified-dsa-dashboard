package com.example.demo;

import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Service
public class DashboardService {

    private final LeetCodeService leetCodeService;

    public DashboardService(LeetCodeService leetCodeService) {
        this.leetCodeService = leetCodeService;
    }

    public Map<String, Object> getDashboard(String leetcode, int gfgTotal) {
        System.out.println("[Dashboard Service] Fetching aggregated stats for LeetCode: " + leetcode
                + ", GFG Total: " + gfgTotal);

        // Handle negative gfgTotal
        if (gfgTotal < 0) {
            System.out.println("[Dashboard Service] GFG total is negative, setting to 0");
            gfgTotal = 0;
        }

        // Fetch data from LeetCode service
        LeetCodeStatsResponse leetcodeStats = null;

        try {
            if (leetcode != null && !leetcode.isEmpty()) {
                System.out.println("[Dashboard Service] Fetching LeetCode stats...");
                leetcodeStats = leetCodeService.getUserStats(leetcode);
                System.out.println("[Dashboard Service] LeetCode stats fetched successfully");
            }
        } catch (Exception e) {
            // Log error but don't fail completely
            System.err.println("[Dashboard Service] Failed to fetch LeetCode stats: " + e.getMessage());
        }

        // Create GFG object with provided total
        Map<String, Object> gfgData = new HashMap<>();
        gfgData.put("totalSolved", gfgTotal);

        // Calculate combined total
        int totalCombined = 0;
        if (leetcodeStats != null) {
            totalCombined += leetcodeStats.getTotalSolved();
        }
        totalCombined += gfgTotal;

        System.out.println("[Dashboard Service] Total combined problems: " + totalCombined);

        // Create and return unified response
        Map<String, Object> dashboard = new HashMap<>();
        dashboard.put("leetcode", leetcodeStats);
        dashboard.put("gfg", gfgData);
        dashboard.put("totalCombined", totalCombined);

        return dashboard;
    }
}