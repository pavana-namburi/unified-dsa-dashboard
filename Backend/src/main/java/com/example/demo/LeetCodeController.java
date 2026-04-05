package com.example.demo;

import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/leetcode")
public class LeetCodeController {

    private final LeetCodeService leetCodeService;

    public LeetCodeController(LeetCodeService leetCodeService) {
        this.leetCodeService = leetCodeService;
    }

    @GetMapping("/{username}")
    public LeetCodeStatsResponse getUserStats(@PathVariable String username) {
        System.out.println("[LeetCode Controller] GetMapping /{username} called with username: " + username);
        return leetCodeService.getUserStats(username);
    }
}