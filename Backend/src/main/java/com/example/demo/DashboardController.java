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
            @RequestParam(required = false) String leetcode,
            @RequestParam(required = false) String gfg) {
        System.out.println(
                "[Dashboard Controller] GetMapping /dashboard called with leetcode=" + leetcode + ", gfg="
                        + gfg);
        return dashboardService.getDashboard(leetcode, gfg);
    }
}
