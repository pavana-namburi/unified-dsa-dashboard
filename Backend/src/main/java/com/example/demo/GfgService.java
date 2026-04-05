package com.example.demo;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.HashMap;
import java.util.Map;

@Service
public class GfgService {

    private final RestTemplate restTemplate;

    public GfgService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    /**
     * Get GFG stats for a user using the stats card API
     *
     * Fetches user stats including easy, medium, hard, and total problems solved
     * from https://gfgstatscard.vercel.app/{username}?raw=true
     */
    public GfgStatsResponse getGfgStats(String username) {
        try {
            System.out.println("[GFG Service] Fetching stats for: " + username);

            String url = "https://gfgstatscard.vercel.app/" + username + "?raw=true";
            System.out.println("[GFG Service] URL: " + url);

            String response = restTemplate.getForObject(url, String.class);
            System.out.println("[GFG Service] API response received");

            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode root = objectMapper.readTree(response);

            // Extract fields with defaults
            int easy = root.path("Easy").asInt(0);
            int medium = root.path("Medium").asInt(0);
            int hard = root.path("Hard").asInt(0);
            int total = root.path("total_problems_solved").asInt(0);

            System.out.println("[GFG Service] Stats - Total: " + total + ", Easy: " + easy + ", Medium: "
                    + medium + ", Hard: " + hard);

            return new GfgStatsResponse(username, total, easy, medium, hard);
        } catch (Exception e) {
            System.err.println("[GFG Service] Error fetching GFG stats for user " + username + ": "
                    + e.getMessage());
            e.printStackTrace();

            // Return fallback response with zeros on error
            System.out.println("[GFG Service] Returning fallback response with zeros");
            return new GfgStatsResponse(username, 0, 0, 0, 0);
        }
    }
}
