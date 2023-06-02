package business.biz.main;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.lang.StringUtils;
import org.codehaus.jackson.map.ObjectMapper;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileOutputStream;

import business.biz.Constants;
import business.biz.dto.MainClusterResponseDto;
import business.biz.dto.MainResponseDto;
import commf.exception.BusinessException;
import common.base.BaseController;
import common.util.FileUtil;
import common.util.WebUtil;
import common.util.properties.ApplicationProperty;


/**
 * @author jogyeongmin
 * 설명 : 메인 화면 컨트롤러 
 *
 */
@EnableWebMvc
@Controller
@SuppressWarnings({"rawtypes", "unused", "unchecked"})
public class MainController extends BaseController {


    @Autowired
    private MainService  mainService;

	@Autowired
	private HttpSession session;
	
	
	/**
	 * 2023-05-26 조경민
	 * 설명 : 메인화면 불러오기
	 */
	@GetMapping("/main")
	public String main(Model model) {
		// 레이어 목록 불러오기 
		List<MainResponseDto> layerMenu = mainService.getLayerMenu();
		
		// 메인 리스트 불러와서 모델에 저장 
		model.addAttribute("list", layerMenu);
		
		
		//메인화면 호출 
		return "/gis/main";
	}
	
	
	
	/**
	 * 2023-05-29 조경민
	 * 설명 : 클러스터를 위한 데이터 불러오기
	 * (2023-05-30 조경민 : wfs cors가 허용되어 사용하지 않음)
	 */
	@GetMapping("/main/cluster-coordinates")
	@ResponseBody
	public List<MainClusterResponseDto> getClusterCoordinates(){
		List<MainClusterResponseDto> coordinatesList = new ArrayList<MainClusterResponseDto>();
		
		// 클러스터 데이터를 담아 리스트로 저장
		coordinatesList = mainService.getCoordinatesList();
		
		// 응답 바디에 담아 전달
		return coordinatesList;
	}
	
	
	@GetMapping("/fmain")
	public String fmain(Model model) {
		// 레이어 목록 불러오기 
		List<MainResponseDto> layerMenu = mainService.getLayerMenu();
		
		// 메인 리스트 불러와서 모델에 저장 
		model.addAttribute("list", layerMenu);
		
		
		//메인화면 호출 
		return "/gis/first-main";
	}
	
	
	
}
