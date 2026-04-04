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

            int easy = 0, medium = 0, hard = 0, total = 0;

            for (JsonNode sub : submissions) {
                String difficulty = sub.path("difficulty").asText();
                int count = sub.path("count").asInt();
                total += count;
                switch (difficulty) {
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

            return new LeetCodeStatsResponse(username, total, easy, medium, hard);
        } catch (Exception e) {
            throw new RuntimeException("Error fetching data from LeetCode", e);
        }
    }}