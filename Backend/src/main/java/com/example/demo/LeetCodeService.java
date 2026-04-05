package com.example.demo;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class LeetCodeService {

    private final RestTemplate restTemplate;

    public LeetCodeService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    // Method to get user stats
    public LeetCodeStatsResponse getUserStats(String username) {
        System.out.println("[LeetCode Service] Fetching stats for: " + username);
        String url = "https://leetcode.com/graphql";
        String query = String.format(
                "{ \"query\": \"query { matchedUser(username: \\\"%s\\\") { submitStats { acSubmissionNum { difficulty count } } } }\" }",
                username);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> entity = new HttpEntity<>(query, headers);

        try {
            ResponseEntity<String> response = restTemplate.postForEntity(url, entity, String.class);
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode root = objectMapper.readTree(response.getBody());

            JsonNode user = root.path("data").path("matchedUser");
            if (user.isMissingNode()) {
                throw new RuntimeException("User not found");
            }

            JsonNode submissions = user.path("submitStats").path("acSubmissionNum");

            int total = 0;
            int easy = 0;
            int medium = 0;
            int hard = 0;

            for (JsonNode node : submissions) {
                String difficulty = node.get("difficulty").asText();
                int count = node.get("count").asInt();

                switch (difficulty) {
                    case "All":
                        total = count;
                        break;
                    case "Easy":
                        easy = count;
                        break;
                    case "Medium":
                        medium = count;
                        break;
                    case "Hard":
                        hard = count;
                        break;
                }
            }

            System.out.println("[LeetCode Service] Stats - Total: " + total + ", Easy: " + easy + ", Medium: " + medium
                    + ", Hard: " + hard);
            return new LeetCodeStatsResponse(username, total, easy, medium, hard);
        } catch (Exception e) {
            System.err.println("[LeetCode Service] Error fetching data from LeetCode: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Error fetching data from LeetCode", e);
        }
    }
}