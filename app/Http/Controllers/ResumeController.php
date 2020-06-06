<?php

namespace App\Http\Controllers;

require_once '/work/vendor/autoload.php';

use Illuminate\Http\Request;
use App\Resume;
use setasign\Fpdi\TcpdfFpdi;

class ResumeController extends Controller
{
    public function index() {
        // nothing to do
    }

    public function store($resumePath) {
        $resume = new Resume;
        $resume->resume_path = $resumePath;
        $resume->save();
        return $resume->id;
    }

    public function show($id) {
        $filePath = Resume::find($id);
        return response()->json(['file' => $filePath]);
        // idに合った画像パスを持ってくる
    }

    public function make(Request $request) {
        // auotloadに反映されなかったのでとりあえず
        require_once '/work/vendor/tecnickcom/tcpdf/tcpdf.php';
        require_once '/work/vendor/setasign/fpdi/src/autoload.php';

        $requestParams = $request->input('params');
        $params = $requestParams['params'];
        $template = '/work/app/Templates/'.$params['template'].'.pdf';

        // PDF描写のための初期設定
        $pdf = new TcpdfFpdi();
        $pdf->SetMargins(0, 0, 0);
        $pdf->SetCellPadding(0);
        $pdf->SetAutoPageBreak(false);
        $pdf->setPrintHeader(false);
        $pdf->setPrintFooter(false);

        // テンプレート読み込み
        $pdf->setSourceFile($template);
        // サイズ
        $pdf->AddPage('L', 'A3');
        $pdf->useTemplate($pdf->importPage(1));

        // フォント設定
        $fontPath = '/work/app/Templates/ipam.ttf';
        $tcpdfFonts = new \TCPDF_FONTS();
        $font = $tcpdfFonts->addTTFfont($fontPath);

        // 出力位置決め
        $content = array();

        $content['nowYear'] = array('x' => 108.0,  'y' => 18.8, 'size' => 9);
        $content['nowMonth'] = array('x' => 122.0, 'y' => 18.8, 'size' => 9);
        $content['nowDay'] = array('x' => 131.0, 'y' => 18.8, 'size' => 9);
        $content['namekana'] = array('x' => 40.0,  'y' => 28.0, 'size' => 8);
        $content['name'] = array('x' => 40.0,  'y' => 38, 'size' => 16);
        $content['year'] = array('x' => 75.5,  'y' => 51.9, 'size' => 9);
        $content['month'] = array('x' => 92.1,  'y' => 51.9, 'size' => 9);
        $content['day'] = array('x' => 105.0,  'y' => 51.9, 'size' => 9);
        $content['age'] = array('x' => 130.5,  'y' => 51.9, 'size' => 9);
        $content['sex_male'] = array('x' => 123.7, 'y' => 33.4, 'size' => 20);
        $content['sex_female'] = array('x' => 134.7, 'y' => 33.4, 'size' => 20);
        $content['addresskana'] = array('x' => 33.5,  'y' => 61.3, 'size' => 7);
        $content['beforePostalCode'] = array('x' => 41.0,  'y' => 67.0, 'size' => 10);
        $content['afterPostalCode'] = array('x' => 54.0,  'y' => 67.0, 'size' => 10);
        $content['address'] = array('x' => 33.5,  'y' => 73.0, 'size' => 10);
        $content['phoneNumber'] = array('x' => 154.0, 'y' => 60.0, 'size' => 11);
        $content['emailAddress'] = array('x' => 143.5,  'y' => 73.0, 'size' => 10);
        $content['emergencyAddresskana'] = array('x' => 33.5,  'y' => 85.8, 'size' => 7);
        $content['emergencyBeforePostalCode'] = array('x' => 41.0,  'y' => 91.8, 'size' => 10);
        $content['emergencyAfterPostalCode'] = array('x' => 54.0,  'y' => 91.8, 'size' => 10);
        $content['emergencyAddress'] = array('x' => 33.5,  'y' => 97.6, 'size' => 10);
        $content['emergencyPhoneNumber'] = array('x' => 154.0, 'y' => 85.5, 'size' => 11);
        $content['emergencyEmailAddress'] = array('x' => 143.5,  'y' => 99.0, 'size' => 10);

        // 学歴・職歴
        $lineMargin = 8.4;
        $careerGeo = 118.3;
        for ($i = 0; $i <= 15; $i++) {
          $careerGeoLine = $careerGeo + ($i * $lineMargin);
          $content['careerYear'.$i] = array('x' => 25.8, 'y' => $careerGeoLine, 'size' => 14);
          $content['careerMonth'.$i] = array('x' => 45.7, 'y' => $careerGeoLine, 'size' => 14);
          $content['careerDetail'.$i] = array('x' => 59.5, 'y' => $careerGeoLine, 'size' => 14);
        }
        // 右ページ
        $creerGeo = 33.4;
        for ($i = 16; $i <= 21; $i++) {
          $careerGeoLine = $creerGeo + (($i - 16) * $lineMargin);
          $content['careerYear'.$i] = array('x' => 234.5, 'y' => $careerGeoLine, 'size' => 14);
          $content['careerMonth'.$i] = array('x' => 254.9, 'y' => $careerGeoLine, 'size' => 14);
          $content['careerDetail'.$i] = array('x' => 269.7, 'y' => $careerGeoLine, 'size' => 14);
        }

        $careerTitleLeft = 108;
        $careerTitleRight = 314;
        $careerCloseLeft = 172;
        $careerCloseRight = 380;

        // 免許・資格
        $lineMargin = 8.5;
        $licenseGeo = 118.3;
        for ($i = 0; $i <= 6; $i++) {
          $licenseGeoLine = $licenseGeo + ($i * $lineMargin);
          $content['skillYear'.$i]   = array('x' => 234.5, 'y' => $licenseGeoLine, 'size' => 14);
          $content['skillMonth'.$i]  = array('x' => 254.9, 'y' => $licenseGeoLine, 'size' => 14);
          $content['skillDetail'.$i] = array('x' => 269.7, 'y' => $licenseGeoLine, 'size' => 14);
        }

        $content['hour'] = array('x' => 369.0, 'y' => 184.8, 'size' => 10);
        $content['minute'] = array('x' => 390.0, 'y' => 184.8, 'size' => 10);
        $content['familyMember'] = array('x' => 390.0, 'y' => 202.9, 'size' => 10);
        $content['partner_yes'] = array('x' => 335.4, 'y' => 215.6, 'size' => 20);
        $content['partner_no'] = array('x' => 349.8, 'y' => 215.6, 'size' => 20);
        $content['partnerNeed_yes'] = array('x' => 372.0, 'y' => 215.6, 'size' => 20);
        $content['partnerNeed_no'] = array('x' => 386.3, 'y' => 215.6, 'size' => 20);

        // 志望動機
        $content['reason'] = array('x' => 228.0, 'y' => 182.0, 'size' => 12, 'width' => 95, 'height' => 12, 'maxHeight' => 40, 'lineHeight' => 1.5);
        // 本人希望記入欄
        $content['want'] = array('x' => 228.0, 'y' => 237.5, 'size' => 12, 'width' => 170, 'height' => 12, 'maxHeight' => 50, 'lineHeight' => 2.3);

        // 出力開始
        $pdf->SetFont($font, '', $content['nowYear']['size']);
        $pdf->Text($content['nowYear']['x'], $content['nowYear']['y'], date('Y'));
        $pdf->Text($content['nowMonth']['x'], $content['nowMonth']['y'], date('n'));
        $pdf->Text($content['nowDay']['x'], $content['nowDay']['y'], date('j'));

        // 氏名ふりがな
        $pdf->SetFont($font, '', $content['namekana']['size']);
        $pdf->Text($content['namekana']['x'], $content['namekana']['y'], $params['lnamekana'].' '.$params['fnamekana']);

        // 氏名
        $pdf->SetFont($font, '', $content['name']['size']);
        $pdf->Text($content['name']['x'], $content['name']['y'], $params['lname'].' '.$params['fname']);

        // 生年月日
        $pdf->SetFont($font, '', $content['year']['size']);
        $pdf->Text($content['year']['x'], $content['year']['y'], $params['year']);
        $pdf->Text($content['month']['x'], $content['month']['y'], $params['month']);
        $pdf->Text($content['day']['x'], $content['day']['y'], $params['day']);
        $pdf->Text($content['age']['x'], $content['age']['y'], $params['age']);

        // 性別
        $pdf->SetFont($font, '', $content['sex_male']['size']);
        if ($params['sex'] == '1') {
          $pdf->Text($content['sex_male']['x'], $content['sex_male']['y'], '○');
        } elseif ($params['sex'] == '2') {
          $pdf->Text($content['sex_female']['x'], $content['sex_female']['y'], '○');
        }

        // 現住所 ふりがな
        $pdf->SetFont($font, '', $content['addresskana']['size']);
        $pdf->Text($content['addresskana']['x'], $content['addresskana']['y'], $params['addresskana']);

        // 現住所 郵便番号
        $beforePostalCode = substr($params['postalCode'], 0, 3);
        $afterPostalCode = substr($params['postalCode'], 3, 7);
        $pdf->SetFont($font, '', $content['beforePostalCode']['size']);
        $pdf->Text($content['beforePostalCode']['x'], $content['beforePostalCode']['y'], $beforePostalCode);
        $pdf->SetFont($font, '', $content['afterPostalCode']['size']);
        $pdf->Text($content['afterPostalCode']['x'], $content['afterPostalCode']['y'], $afterPostalCode);

        // 現住所
        $pdf->SetFont($font, '', $content['address']['size']);
        $pdf->Text($content['address']['x'], $content['address']['y'], $params['prefecture'].$params['address'].PHP_EOL.$params['apartment']);

        // 電話
        $pdf->SetFont($font, '', $content['phoneNumber']['size']);
        $pdf->Text($content['phoneNumber']['x'], $content['phoneNumber']['y'], $params['phoneNumber']);

        $pdf->SetFont($font, '', $content['emailAddress']['size']);
        $pdf->Text($content['emailAddress']['x'], $content['emailAddress']['y'], $params['emailAddress']);

        // 緊急連絡先 ふりがな
        $emergencyAddress = $params['emergencyAddress'];
        if(!is_null($emergencyAddress[4])) {
            $pdf->SetFont($font, '', $content['emergencyAddresskana']['size']);
            $pdf->Text($content['emergencyAddresskana']['x'], $content['emergencyAddresskana']['y'], $emergencyAddress[4]);
        }
        // 緊急連絡先 郵便番号
        if(!is_null($emergencyAddress[0])) {
            $beforePostalCode = substr($emergencyAddress[0], 0, 3);
            $afterPostalCode = substr($emergencyAddress[0], 3, 7);
            $pdf->SetFont($font, '', $content['emergencyBeforePostalCode']['size']);
            $pdf->Text($content['emergencyBeforePostalCode']['x'], $content['emergencyBeforePostalCode']['y'], $beforePostalCode);
            $pdf->SetFont($font, '', $content['emergencyAfterPostalCode']['size']);
            $pdf->Text($content['emergencyAfterPostalCode']['x'], $content['emergencyAfterPostalCode']['y'], $afterPostalCode);
        }

        // 緊急連絡先 住所
        if(!is_null($emergencyAddress[1])) {
            $pdf->SetFont($font, '', $content['emergencyAddress']['size']);
            $pdf->Text($content['emergencyAddress']['x'], $content['emergencyAddress']['y'], $emergencyAddress[1].$emergencyAddress[2].PHP_EOL.$emergencyAddress[3]);
        }

        // 緊急電話
        $emergencyContact = $params['emergencyContact'];
        if(!is_null($emergencyContact[0])) {
            $pdf->SetFont($font, '', $content['emergencyPhoneNumber']['size']);
            $pdf->Text($content['emergencyPhoneNumber']['x'], $content['emergencyPhoneNumber']['y'], $emergencyContact[0]);
        }

        if(!is_null($emergencyContact[1])) {
            $pdf->SetFont($font, '', $content['emergencyEmailAddress']['size']);
            $pdf->Text($content['emergencyEmailAddress']['x'], $content['emergencyEmailAddress']['y'], $emergencyContact[1]);
        }

        // 学歴・職歴
        $career = array();

        $education = array();
        for ($i = 0; $i < count($params['educationEducation']); $i++) {
            $education[] = array(
              'type'    => '', 
              'year'    => $params['educationYear'][$i], 
              'month'   => $params['educationMonth'][$i], 
              'detail'  => $params['educationEducation'][$i],
            );
        }

        $career[] = array('type' => 'title', 'year' => '', 'month' => '', 'detail' => '学　歴');

        if ($education) {
          foreach ($education as $edu) {
            $career[] = $edu;
          }
        } else {
          $career[] = array('type' => '', 'year' => '', 'month' => '', 'detail' => 'なし');
        }

        $career[] = array('type' => 'title', 'year' => '', 'month' => '', 'detail' => '');

        $jobs = array();
        for ($i = 0; $i < count($params['jobJob']); $i++) {
            $jobs[] = array(
              'type'    => '', 
              'year'    => $params['jobYear'][$i], 
              'month'   => $params['jobMonth'][$i], 
              'detail'  => $params['jobJob'][$i],
            );
        }

        $career[] = array('type' => 'title', 'year' => '', 'month' => '', 'detail' => '職　歴');

        if ($jobs) {
          foreach ($jobs as $job) {
            $career[] = $job;
          }
          $career[] = array('type' => '', 'year' => '', 'month' => '', 'detail' => '現在に至る');
        } else {
          $career[] = array('type' => '', 'year' => '', 'month' => '', 'detail' => 'なし');
        }

        $career[] = array('type' => 'close', 'year' => '', 'month' => '', 'detail' => '以上');

        $pdf->SetFont($font, '', $content['careerYear0']['size']);
        foreach ($career as $seq => $careerContent) {
          if ($seq > 22) {
            break;
          } else {
            if ($careerContent['type'] == 'title') {
              if ($seq <= 16) {   // 16行以下は左ページ
                $pdf->Text($careerTitleLeft, $content['careerDetail'.$seq]['y'], $careerContent['detail']);
              } else {          // 17行以上は右ページ
                $pdf->Text($careerTitleRight, $content['careerDetail'.$seq]['y'], $careerContent['detail']);
              }
            } elseif ($careerContent['type'] == 'close') {
              if ($seq <= 16) {
                $pdf->Text($careerCloseLeft, $content['careerDetail'.$seq]['y'], $careerContent['detail']);
              } else {
                $pdf->Text($careerCloseRight, $content['careerDetail'.$seq]['y'], $careerContent['detail']);
              }
            } else {
              $pdf->Text($content['careerYear'.$seq]['x'], $content['careerYear'.$seq]['y'], $careerContent['year']);
              if ($careerContent['month'] < 10) {
                $pdf->Text($content['careerMonth'.$seq]['x'] + 1.5, $content['careerMonth'.$seq]['y'], $careerContent['month']);
              } else {
                $pdf->Text($content['careerMonth'.$seq]['x'], $content['careerMonth'.$seq]['y'], $careerContent['month']);
              }
              $pdf->Text($content['careerDetail'.$seq]['x'], $content['careerDetail'.$seq]['y'], $careerContent['detail']);
            }
          }
        }

        // 免許・資格
        $licenses = array();

        for ($i = 0; $i < count($params['skillSkill']); $i++) {
            $licenses[] = array(
              'type'    => '', 
              'year'    => $params['skillYear'][$i], 
              'month'   => $params['skillMonth'][$i], 
              'detail'  => $params['skillSkill'][$i],
            );
        }

        $pdf->SetFont($font, '', $content['skillYear0']['size']);
        foreach ($licenses as $seq => $skillContent) {
          $pdf->Text($content['skillYear'.$seq]['x'], $content['skillYear'.$seq]['y'], $skillContent['year']);
          if ($skillContent['month'] < 10) {
            $pdf->Text($content['skillMonth'.$seq]['x'] + 1.5, $content['skillMonth'.$seq]['y'], $skillContent['month']);
          } else {
            $pdf->Text($content['skillMonth'.$seq]['x'], $content['skillMonth'.$seq]['y'], $skillContent['month']);
          }
          $pdf->Text($content['skillDetail'.$seq]['x'], $content['skillDetail'.$seq]['y'], $skillContent['detail']);
        }

        // 通勤時間
        $pdf->SetFont($font, '', $content['hour']['size']);
        $pdf->Text($content['hour']['x'], $content['hour']['y'], $params['hour']);
        $pdf->Text($content['minute']['x'], $content['minute']['y'], $params['minute']);

        // 扶養家族
        $pdf->SetFont($font, '', $content['familyMember']['size']);
        $pdf->Text($content['familyMember']['x'], $content['familyMember']['y'], $params['familyMember']);

        // 配偶者
        $pdf->SetFont($font, '', $content['partner_yes']['size']);
        if ($params['partner'] == '1') {
          $pdf->Text($content['partner_yes']['x'], $content['partner_yes']['y'], '○');
        } elseif ($params['partner'] == '2') {
          $pdf->Text($content['partner_no']['x'], $content['partner_no']['y'], '○');
        }

        // 配偶者の扶養義務
        $pdf->SetFont($font, '', $content['partnerNeed_yes']['size']);
        if ($params['partnerNeed'] == '1') {
          $pdf->Text($content['partnerNeed_yes']['x'], $content['partnerNeed_yes']['y'], '○');
        } elseif ($params['partnerNeed'] == '2') {
          $pdf->Text($content['partnerNeed_no']['x'], $content['partnerNeed_no']['y'], '○');
        }

        // 志望動機
        $text = $params['reason'];
        $pdf->SetFont($font, '', $content['reason']['size']);
        $pdf->setCellHeightRatio($content['reason']['lineHeight']);  // 行の高さ調整
        $pdf->MultiCell($content['reason']['width'], $content['reason']['height'], $text, 0, '', false, 1, $content['reason']['x'], $content['reason']['y'], true, 0, false, true, $content['reason']['maxHeight'], 'T', false);

        // 本人希望記入欄
        $text = $params['want'];
        $pdf->SetFont($font, '', $content['want']['size']);
        $pdf->setCellHeightRatio($content['want']['lineHeight']);  // 行の高さ調整
        $pdf->MultiCell($content['want']['width'], $content['want']['height'], $text, 0, '', false, 1, $content['want']['x'], $content['want']['y'], true, 0, false, true, $content['want']['maxHeight'], 'T', false);
 
        $uuid = uniqid();
        $resumePath = 'tempResume/'.$uuid.'.pdf';
        $id = $this->store($resumePath);
        $resumePath = '/work/public/'.$resumePath;
        $pdf->Output($resumePath, 'F');
        return $this->show($id);
    }
}
