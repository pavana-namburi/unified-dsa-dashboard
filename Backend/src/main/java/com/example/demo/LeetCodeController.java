package com.example.demo;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/leetcode")
public class LeetCodeController {

    private final LeetCodeService leetCodeService;

    public LeetCodeController(LeetCodeService leetCodeService) {
        this.leetCodeService = leetCodeService;
    }

    @GetMapping("/{username}")
    public LeetCodeStatsResponse getUserStats(@PathVariable String username) {
        return leetCodeService.getUserStats(username);
    }
}