package com.example.demo;

import org.springframework.stereotype.Service;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class GfgService {

    /**
     * Get GFG stats for a user - Extract totalSolved from profile page
     * 
     * Uses Jsoup to fetch the HTML profile page and regex to extract the
     * "Problems Solved" count. Simple and reliable approach without API calls.
     */
    public Map<String, Object> getGfgStats(String username) {
        try {
            System.out.println("[GFG Service] Fetching stats for: " + username);

            // Fetch the GFG profile page
            String url = "https://auth.geeksforgeeks.org/user/" + username + "/";
            System.out.println("[GFG Service] URL: " + url);

            Document doc = Jsoup.connect(url)
                    .userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36")
                    .timeout(10000)
                    .get();

            // Extract all text from the page
            String text = doc.text();
            System.out.println("[GFG Service] Page fetched successfully");

            // Use regex to find "Problems Solved" followed by a number
            Pattern pattern = Pattern.compile("Problems Solved\\s*(\\d+)");
            Matcher matcher = pattern.matcher(text);

            int totalSolved = 0;
            if (matcher.find()) {
                totalSolved = Integer.parseInt(matcher.group(1));
                System.out.println("[GFG Service] Found Problems Solved: " + totalSolved);
            } else {
                System.out.println("[GFG Service] Pattern not found, trying alternative patterns");
                // Try alternative patterns
                Pattern altPattern1 = Pattern.compile("problems solved[:\\s]+(\\d+)");
                Matcher altMatcher1 = altPattern1.matcher(text);
                if (altMatcher1.find()) {
                    totalSolved = Integer.parseInt(altMatcher1.group(1));
                    System.out.println("[GFG Service] Found via alternative pattern: " + totalSolved);
                }
            }

            System.out.println("[GFG Service] Total Solved extracted: " + totalSolved);

            Map<String, Object> result = new HashMap<>();
            result.put("username", username);
            result.put("totalSolved", totalSolved);

            return result;
        } catch (Exception e) {
            System.err.println("[GFG Service] Error fetching GFG stats for user " + username + ": "
                    + e.getMessage());
            e.printStackTrace();

            // Return fallback response on error
            Map<String, Object> fallback = new HashMap<>();
            fallback.put("username", username);
            fallback.put("totalSolved", 0);
            return fallback;
        }
    }
}
