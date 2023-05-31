<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html lang="ko">

<jsp:include page="/WEB-INF/jsp/egovframework/include/gis_header.jsp"/>

<head>
	<link type="text/css" href="style/gis.css" rel="stylesheet">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
   <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
   <style>
   .scrollable-div {
		width: 100%;
		height: 100%;
		overflow: auto;
   }
   .scrollable-div ul {
		list-style-type: none;
		padding-left: 10px;
      }
	
	.scrollable-div ul ul {
		display: none;
		margin-left: 10px;
	}
	
	.scrollable-div li {
		position: relative;
		padding-left: 10px;
	}
	
	.scrollable-div li:not(:has(> input[type="checkbox"]))::before {
	    content: "";
	    position: absolute;
	    top: 8px;
	    left: 0;
	    width: 0;
	    height: 0;
	    border-bottom: 10px solid black;
	    border-left: 5px solid transparent;
	    border-right: 5px solid transparent;
	    transform: rotate(180deg);
	} 
   </style>
</head>

<body>
	<section class="gis">

		<div class="gis-wrap">
			
			<div class="gis-inner">
				<button class="gis-inner-btn"><img src="images/gis/i-menuBtn.svg" alt="" /></button>
				<div class="gis-search">
					
					<!-- 리스트 -->
					<div class="gis-list depItem">
						<div class="gis-list-tit"><p style="display: inline-block;">검색</p>
						    <input type="text" style="display: inline-block;margin-left: 10px;margin-top: -3px;">
						</div>
						<div>
							<form>
	      						<label>cluster distance</label>
						    	<input id="distance" type="range" min="0" max="100" step="1" value="40"/>
						    </form>
						</div>
						<div class="gis-list-table">
							<div class="scrollable-div">
								<ul id="foldable-list">
									<li>해역이용영향평가GIS레이어
										<ul>
											<c:forEach var="list1" items="${list}">
												<c:if test="${list1.level == 0}">
													<c:choose>
														<c:when test="${list1.child_yn}">
															<li>${list1.name}
																<ul>
																	<c:forEach var="list2" items="${list}">
																		<c:if test="${list2.parent_id == list1.id && list2.level == list1.level + 1}">
																			<c:choose>
																				<c:when test="${list2.child_yn}">
																					<li>${list2.name}
																						<ul>
																							<c:forEach var="list3" items="${list}">
																								<c:if test="${list3.parent_id == list2.id && list3.level == list2.level + 1}">
																									<c:choose>
																										<c:when test="${list3.child_yn}">
																											<li>${list3.name}
																												<ul>
																													<c:forEach var="list4" items="${list}">
																														<c:if test="${list4.parent_id == list3.id && list4.level == list3.level + 1}">
																															<c:choose>
																																<c:when test="${list4.child_yn}">
																																	<li>${list4.name}</li>
																																</c:when>
																																<c:otherwise>
																																	<li><input type="checkbox" class="checkLayer" id="${list4.id}checkLayer">${list4.name}</li>
																																</c:otherwise>
																															</c:choose>
																														</c:if>
																													</c:forEach>
																												</ul>
																											</li>
																										</c:when>
																										<c:otherwise>
																											<li><input type="checkbox" class="checkLayer" id="${list3.id}checkLayer">${list3.name}</li>
																										</c:otherwise>
																									</c:choose>
																								</c:if>
																							</c:forEach>
																						</ul>
																					</li>
																				</c:when>
																				<c:otherwise>
																					<li><input type="checkbox" class="checkLayer" id="${list2.id}checkLayer">${list2.name}</li>
																				</c:otherwise>
																			</c:choose>
																		</c:if>
																	</c:forEach>
																</ul>
															</li>
														</c:when>
														<c:otherwise>
															<li><input type="checkbox" class="checkLayer" id="${list1.id}checkLayer">${list1.name}</li>
														</c:otherwise>
													</c:choose>
												</c:if>
											</c:forEach>
										</ul>
									</li>
								</ul>
							</div>	
						</div>
					</div>
				</div>
			</div>
			
			<div class="gis-map" id="gis_map">
				<div class="gis-map-btn">
					<ul class="gis-map-btn-option">
						<li class="map"><a href="#void">배경지도</a>
							<div class="info">
								<div class="info-find">
									<a id="vworld-base" class="on" href="#void"><img src="images/basemap/vworld-base-thumb.png" alt="" />일반지도</a>
									<a id="vworld-gray" class="" href="#void"><img src="images/basemap/vworld-gray-thumb.png" alt="" />회색지도</a>
									<a id="vworld-satbrid" class="" href="#void"><img src="images/basemap/vworld-satbrid-thumb.png" alt="" />위성지도</a>
									<a id="vworld-sathybrid" class="" href="#void"><img src="images/basemap/vworld-hybrid-thumb.PNG" alt="" />하이브리드</a>
								</div>
							</div>
						</li>
						<li class="layer"><a href="#void">레이어</a>
							<div class="info">
								<h4>레이어<button type="button" class="btn-close"></button></h4>
								<div class="info-inner">
									<div class="inputWrap">
										<input class="layer" type="checkbox" checked id="fishery_management">
										<label for="fishery_management">면허어장도</label>
									</div>
									<div class="inputWrap">
										<input class="layer" type="checkbox" checked id="fishery_observatory">
										<label for="fishery_observatory">실시간 해양환경 관측소</label>
									</div>
								</div>
							</div>
						</li>
						<li class="legend"><a href="#void">범례</a>
							<div class="info">
								<h4>범례<button type="button" class="btn-close"></button></h4>
								<div class="info-inner">
									<ul>
								        <li>
								            <img src="images/icon/nifs.png" style="width: 20px; margin-right: 10px;"> 국립수산과학원
								        </li>
								        <li>
								            <img src="images/icon/kma.png" style="width: 20px; margin-right: 10px;"> 기상청
								        </li>
								        <li>
								            <img src="images/icon/khnp.png" style="width: 20px; margin-right: 10px;"> 한국수력원자력
								        </li>
								        <li>
								            <img src="images/icon/government.png" style="width: 20px; margin-right: 10px;"> 지자체
								        </li>
								        <li>
								            <img src="images/icon/inspect.png" style="width: 20px; margin-right: 10px;"> 점검중
								        </li>
									</ul>
								</div>
							</div>
						</li>
					</ul>
					<ul class="gis-map-btn-click">
						<li class="plus" id="zoom-in"><a href="#void"></a></li>
                  		<li class="minus" id="zoom-out"><a href="#void"></a></li>
					</ul>
				</div>
				
			</div>
			
			
		</div>
		
		</section>
		
		<!-- Modal -->
		<div class="modal fade" id="mapLayer" tabindex="-1" aria-labelledby="mapLayerLabel" aria-hidden="true">
		  <div class="modal-dialog">
		    <div class="modal-content">
		      <div class="modal-body">
				<div class="modal-item">
					<div class="modal-item-top">
						<h1 class="modal-title" id="mapLayerLabel">통영 학림 <span class="date">2022-10-04 14:30</span></h1>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="tableWrap type3">
						<table>
							<tr>
								<th>표층수온</th>
								<th>중층수온</th>
								<th>저층수온</th>
							</tr>
							<tr>
								<td>23.2℃</td>
								<td>미설치</td>
								<td>미설치</td>
							</tr>
							<tr>
								<th>기온</th>
								<td colspan="2">미설치</td>
							</tr>
							<tr>
								<th>염분</th>
								<td colspan="2">32.11</td>
							</tr>
							<tr>
								<th>용존산소</th>
								<td colspan="2">7.04mg/L</td>
							</tr>
						</table>
					</div>
				</div>
		      </div>
		    </div>
		  </div>
		</div>
		
		<div class="modal fade" id="viewOriginal" tabindex="-1" aria-labelledby="viewOriginalLabel" aria-hidden="true" style="top: 6%;">
		  <div class="modal-dialog">
		    <div class="modal-content" style="width:max-content;">
		      <div class="modal-body">
				<div class="modal-item">
					<div class="modal-item-top">
						<h1 class="modal-title" id="viewOriginalLabel">어장구역도(스캔본)</h1>
						<a type="button" style="margin-right: 60px; cursor: pointer; padding: 0 11px; line-height: 30px; color: #fff; border-radius: 5px; font-size: 15px; font-weight: 500; width: 60px; text-align: center; background: var(--sky);">출력</a>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div style="width: 100%; border-bottom: 1.9px solid #838383; position: absolute; left: 0;"></div>
					<div class="tableWrap type3" id="print_img">
						<img src="images/gis/view_original.jpg" alt="로고">
					</div>
				</div>
		      </div>
		    </div>
		  </div>
		</div>
		
		<!-- 실시간 해양환경 관측소 마우스 오버 팝업창 -->
		<div id="real_time_inform" class="ol-new-popup">
	    	<div id="mapLayer_head" class="ol-new-popup-head">
	    		<h1 class="overlay-title" id="observatory_nm">
	    			통영 학림
	    			<span class="date">2022-10-04 14:30</span>
    			</h1>
    		</div>
	    	<div id="mapLayer_content" class="tableWrap type3">
	    		<table id="observatory_inform">
					<tr>
						<th>표층수온</th>
						<th>중층수온</th>
						<th>저층수온</th>
					</tr>
					<tr>
						<td id="surface_class">23.2℃</td>
						<td id="middle_class">미설치</td>
						<td id="low_class">미설치</td>
					</tr>
					<tr>
						<th>기온</th>
						<td colspan="2" id="temp">미설치</td>
					</tr>
					<tr>
						<th>염분</th>
						<td colspan="2" id="salt">32.11</td>
					</tr>
					<tr>
						<th>용존산소</th>
						<td colspan="2" id="oxygen">7.04mg/L</td>
					</tr>
				</table>
	    	</div>
		</div>
		
		
		<!-- Modal -->
		<div class="modal fade" id="liveSea" tabindex="-1" style="top: 180px;" aria-labelledby="liveSeaLabel" aria-hidden="true">
		  <div class="modal-dialog modal-lg">
		    <div class="modal-content">
		      <div class="modal-header">
		        <h1 class="modal-title fs-4" id="liveSeaLabel">실시간 해양환경 관측소</h1>
		        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
		      </div>
		      <div class="modal-body">
				<div class="modal-item">
					<div class="tableWrap type2 align_c">
						<table>
							<colgroup>
								<col width="15%" />
								<col width="35%" />
								<col width="15%" />
								<col width="35%" />
							</colgroup>
							<tr>
								<th>관측소명</th>
								<td class="left" id="observatory_nm_td">경상남도</td>
								<th>관측소코드</th>
								<td class="left" id="observatory_cd_td">gi086</td>
							</tr>
							<tr>
								<th>설치일자</th>
								<td class="left" id="install_date_td">200/06/20</td>
								<th>종료 일자</th>
								<td class="left" id="end_date_td">-</td>
							</tr>
							<tr>
								<th>관측소사진</th>
								<td colspan="3" id="observatory_img_td"><img src="https://www.nifs.go.kr/risa//Upload/sta_cde/eng5c_2.jpg" alt="" /></td>
								<!-- <td colspan="3"><img src="images/gis/sea-img.jpg" alt="" /></td> -->
							</tr>
							<tr>
								<th>좌표</th>
								<td colspan="3" class="left">
									<div class="list">
										<span>위도</span>
										<p id="lat_td">34.80308</p>
									</div>
									<div class="list">
										<span>경도</span>
										<p id="lon_td">128.7094</p>
									</div>
								</td>
							</tr>
							<tr>
								<th>측정수심(m)</th>
								<td colspan="3" class="left">
									<div class="list">
										<span>표층</span>
										<p id="surface_td">5.0</p>
									</div>
									<div class="list">
										<span>중층</span>
										<p id="middle_td">측정안함</p>
									</div>
									<div class="list">
										<span>저층</span>
										<p id="low_td">측정안함</p>
									</div>
								</td>
							</tr>
							<tr>
								<th>측정여부</th>
								<td colspan="3" class="left">
									<div class="list">
										<span>항목</span>
										<p>수온</p>
									</div>
									<div class="list">
										<span>표층</span>
										<p id="surface_measure_td">0</p>
									</div>
									<div class="list">
										<span>중층</span>
										<p id="middle_measure_td">측정안함</p>
									</div>
									<div class="list">
										<span>저층</span>
										<p id="low_measure_td">측정안함</p>
									</div>
								</td>
							</tr>
							<tr>
								<th>관측소설명</th>
								<td class="left" id="observatory_explain_td">-</td>
							</tr>
						</table>
					</div>
				</div>
		      </div>
		    </div>
		  </div>
		</div>
		
		
		<!-- Modal -->
		<div class="modal fade" id="license" style="top:50px;" tabindex="-1" aria-labelledby="licenseLabel" aria-hidden="true">
		  <div class="modal-dialog modal-xl">
		    <div class="modal-content">
		      <div class="modal-header">
		        <h1 class="modal-title fs-5" id="licenseLabel">양식장면허심사평가</h1>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
		      </div>
		      <div class="modal-body">
				<div class="modal-item">
					<h2 class="subTit">어장면허변경정보</h2>
					<div class="tableWrap type2">
						<table id="fishery_pop_table">
							<colgroup>
								<col width="15%" />
								<col width="35%" />
								<col width="15%" />
								<col width="35%" />
							</colgroup>
						</table>
						<table id="fishery_pop_table2">	
							<colgroup>
								<col width="15%" />
								<col width="35%" />
								<col width="15%" />
								<col width="35%" />
							</colgroup>
							<tr>
										<th>행정구역</th>
										<td></td>
										<th>수면의 위치</th>
										<td></td>
									</tr>
									<tr>
										<th>면허번호</th>
										<td></td>
										<th>어장번호</th>
										<td></td>
									</tr>
									<tr>
										<th>면허상태</th>
										<td></td>
										<th>면허기간</th>
										<td></td>
									</tr>
									<tr>
										<th>양식업종류</th>
										<td></td>
										<th>어업권자</th>
										<td></td>
									</tr>
						</table>
					</div>
				</div>
				<div class="totalWrap flexBox">
						<div class="total-item flexBox" style="width:50%" id ="jonghap_table">
						</div>
						<div class="total-item flexBox" style="width:50%" id ="jumsu_table">
						</div>
					</div>
				<div class="modal-item">
					<h2 class="subTit">어장면허심사평가</h2>
					<div class="tableWrap type4">
						<table>
							<thead>
								<tr>
									<th>기준</th>
									<th>평가점수</th>
								</tr>
							</thead>
							<tbody id="simsa_table">
							</tbody>
						</table>
						<table>
							<thead>
								<tr>
									<th>기준</th>
									<th>평가점수</th>
								</tr>
							</thead>
							<tbody id="simsa_table2">
							</tbody>
						</table>
					</div>
					
				</div>
				<div class="modal-item">
					<div class="tabWrap type3">
						<ul class="li-6">
							<li class="on" id="lic_1"><button>휴업정보</button></li>
							<li id="lic_2"><button>불법임대정보</button></li>
							<li id="lic_3"><button>과태료정보</button></li>
							<li id="lic_4"><button>어장휴식정보</button></li>
							<li id="lic_5"><button>어장청소정보</button></li>
							<li id="lic_6"><button>어장환경정보</button></li>
						</ul>
					</div>
					<!-- 양식장팝업 휴업정보 -->
					<div class="tabInner">
						<div id="tabInner1" class="on">
							<div class="flexBox">
								<div class="tableWrap type1" style="width:30%;">
									<table>
										<thead>
											<tr>
												<th>총 기간</th>
												<th>평가점수</th>
											</tr>
										</thead>
										<tbody id="fishery_pop_closed1">
										</tbody>
									</table>
								</div>
								<div class="tableWrap type1" style="width:70%;">
									<table>
										<thead>
											<tr>
												<th></th>
												<th>휴업시작일</th>
												<th>휴업종료일</th>
												<th>휴업기간</th>
												<th>비고</th>
											</tr>
										</thead>
										<tbody id ="fishery_pop_closed2">
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
					<!-- 양식장팝업 불법임대정보 -->
					<div class="tabInner">
						<div id="tabInner2">
							<div class="flexBox">
								<div class="tableWrap type1" style="width:30%;">
									<table>
										<thead>
											<tr>
												<th>총 횟수</th>
												<th>평가점수</th>
											</tr>
										</thead>
										<tbody id="fishery_pop_illegalrental_1">
										</tbody>
									</table>
								</div>
								<div class="tableWrap type1" style="width:70%;">
									<table>
										<thead>
											<tr>
												<th></th>
												<th>접수일자</th>
												<th>접수내용</th>
												<th>원인일자</th>
												<th>원인내용</th>
												<th>등록일자</th>
												<th>기타사항</th>
											</tr>
										</thead>
										<tbody id="fishery_pop_illegalrental">
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
					
					<!-- 양식장팝업 과태료정보 -->
					<div class="tabInner">
						<div id="tabInner3">
							<div class="flexBox">
								<div class="tableWrap type1" style="width:30%;">
									<table>
										<thead>
											<tr>
												<th>총 횟수</th>
												<th>평가점수</th>
											</tr>
										</thead>
										<tbody id="fishery_pop_imposepenalty_1">
										</tbody>
									</table>
								</div>
								<div class="tableWrap type1" style="width:70%;">
									<table>
										<thead>
											<tr>
												<th></th>
												<th>접수일자</th>
												<th>접수내용</th>
												<th>원인일자</th>
												<th>원인내용</th>
												<th>등록일자</th>
												<th>기타사항</th>
											</tr>
										</thead>
										<tbody id="fishery_pop_imposepenalty">
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
					<!-- 양식장팝업 어장휴식정보 -->
					<div class="tabInner">
						<div id="tabInner4">
							<div class="flexBox">
								<div class="tableWrap type1" style="width:30%;">
									<table>
										<thead>
											<tr>
												<th>총 기간</th>
												<th>평가점수</th>
											</tr>
										</thead>
										<tbody id="fishery_pop_fisherybreak_1">
										</tbody>
									</table>
								</div>
								<div class="tableWrap type1" style="width:70%;">
									<table>
										<thead>
											<tr>
												<th></th>
												<th>접수일자</th>
												<th>접수내용</th>
												<th>원인일자</th>
												<th>원인내용</th>
												<th>등록일자</th>
												<th>종료일자</th>
												<th>기타사항</th>
											</tr>
										</thead>
										<tbody id="fishery_pop_fisherybreak">
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
					<!-- 양식장팝업 어장청소정보 -->
					<div class="tabInner">
						<div id="tabInner5">
							<div class="flexBox">
								<div class="tableWrap type1" style="width:30%;">
									<table>
										<thead>
											<tr>
												<th>총 횟수</th>
												<th>평가점수</th>
											</tr>
										</thead>
										<tbody id="fishery_pop_fisherycleaning_1">
										</tbody>
									</table>
								</div>
								<div class="tableWrap type1" style="width:70%;">
									<table>
										<thead>
											<tr>
												<th></th>
												<th>청소실시 시기</th>
												<th>청소 방법</th>
												<th>처리량(kg)</th>
												<th>비고</th>
											</tr>
										</thead>
										<tbody id="fishery_pop_fisherycleaning">
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
					<!-- 양식장팝업 어장환경정보 -->
					<div class="tabInner">
						<div id="tabInner6">
							<div class="flexBox">
								<div class="tableWrap type1" style="width:30%;">
									<table>
										<thead>
											<tr>
												<th>어장환경 평가등급</th>
												<th>평가점수</th>
											</tr>
										</thead>
										<tbody id="fishery_pop_environmental_1">
										</tbody>
									</table>
								</div>
								<div class="tableWrap type1" style="width:70%;">
									<table>
										<thead>
											<tr>
												<th>평가지수</th>
												<th>총 유기탄소량 점수</th>
												<th>총 유기탄소량</th>
												<th>저서동물지수 점수</th>
												<th>저서동물지수</th>
												<th>평가일자</th>
												<th>비고</th>
											</tr>
										</thead>
										<tbody id="fishery_pop_environmental">
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="modal-item">
					<div class="tableWrap type2 align_c">
						<table>
							<colgroup>
								<col width="10%" />
								<col width="90%" />
							</colgroup>
							<tr>
								<th>의견사항</th>
								<td class="left">과태료 이력 재확인 필요</td>
							</tr>
						</table>
					</div>
				</div>
		      </div>
		      <div class="modal-footer">
		        <button style="width:140px" type="button" class="btn btn-secondary" data-bs-dismiss="modal">취소</button>
		        <button style="width:140px" type="button" class="btn btn-success">출력</button>
		        <button style="width:140px" type="button" class="btn btn-primary">저장</button>
		      </div>
		    </div>
		  </div>
		</div>
		<script>
                         document.addEventListener("DOMContentLoaded", function() {
                             var foldableList = document.querySelector("#foldable-list");
                             
                             foldableList.addEventListener("click", function(event) {
                                 var target = event.target;
                                 if (target.tagName === "LI") {
                                     var sublist = target.querySelector("ul");
                                     if (sublist) {
                                         sublist.style.display = sublist.style.display === "none" ? "block" : "none";
                                     }
                                 }
                             });
                         });
                     </script>
		<script defer src="script/main/layer.js"></script>
      <script defer src="script/main/cluster.js"></script>
</body>
