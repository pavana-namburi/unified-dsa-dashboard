package com.example.demo;

import org.springframework.web.bind.annotation.*;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping
    public Map<String, Object> getDashboard(
            @RequestParam String leetcode,
            @RequestParam int gfgTotal) {
        System.out.println(
                "[Dashboard Controller] GetMapping /dashboard called with leetcode=" + leetcode + ", gfgTotal="
                        + gfgTotal);
        return dashboardService.getDashboard(leetcode, gfgTotal);
    }
}
