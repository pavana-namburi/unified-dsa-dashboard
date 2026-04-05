package com.example.demo;

import org.springframework.web.bind.annotation.*;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/gfg")
public class GfgController {

    private final GfgService gfgService;

    public GfgController(GfgService gfgService) {
        this.gfgService = gfgService;
    }

    @GetMapping("/{username}")
    public Map<String, Object> getGfgStats(@PathVariable String username) {
        System.out.println("[GFG Controller] GetMapping /{username} called with username: " + username);
        return gfgService.getGfgStats(username);
    }
}
