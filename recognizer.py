import torch
from PIL import Image
from torchvision import transforms
import sys
import json
model = torch.hub.load('pytorch/vision:v0.6.0',
                       'inception_v3', pretrained=True)

model.eval()
image_path = str()
with open('object.json', 'r') as f:
    data = f.read()

    image_path = json.loads(data)['path']


input_image = Image.open(image_path).convert('RGB')

preprocess = transforms.Compose([
    transforms.Resize(299),
    transforms.CenterCrop(299),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                         std=[0.229, 0.224, 0.225]),
])

input_tensor = preprocess(input_image)
input_batch = input_tensor.unsqueeze(0)


if torch.cuda.is_available():
    input_batch = input_batch.to('cuda')
    model.to('cuda')


with torch.no_grad():
    output = model(input_batch)

probabilities = torch.nn.functional.softmax(output[0], dim=0)

with open("image_classes.txt", "r") as f:
    categories = [s.strip() for s in f.readlines()]

top5_prob, top5_catid = torch.topk(probabilities, 3)
answers = ''
for i in range(top5_prob.size(0)):
    answers += f"{categories[top5_catid[i]]}&nbsp&nbsp"

    answers += f"{top5_prob[i].item()}"
    answers += "<br>"
print(answers)
sys.stdout.flush()
