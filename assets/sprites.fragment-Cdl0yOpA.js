import{c as e}from"./index-DdRnmvTn.js";import{n as t,t as n}from"./fogFragment-BZVH4Cp_.js";import{i as r,n as i,r as a,t as o}from"./meshBlendTagFragmentOutput-zsm3rXPX.js";import{t as s}from"./helperFunctions-L4hUq-QM.js";import{t as c}from"./logDepthDeclaration-CAnff8ne.js";var l=`imageProcessingCompatibility`,u=`#ifdef IMAGEPROCESSINGPOSTPROCESS
fragmentOutputs.color=vec4f(pow(fragmentOutputs.color.rgb, vec3f(2.2)),fragmentOutputs.color.a);
#endif
`;e.IncludesShadersStoreWGSL[l]||(e.IncludesShadersStoreWGSL[l]=u);var d={name:l,shader:u},f=`geometryRenderingFragment`,p=`#ifdef PREPASS
#if SCENE_MRT_COUNT>0
let geometryCoverage=select(0.0,1.0,geometryColor.a>0.4);var fragData: array<vec4f,SCENE_MRT_COUNT>;
#ifdef PREPASS_COLOR
fragData[PREPASS_COLOR_INDEX]=geometryColor;
#endif
#ifdef PREPASS_POSITION
fragData[PREPASS_POSITION_INDEX]=vec4f(geometryPositionW,geometryCoverage);
#endif
#ifdef PREPASS_LOCAL_POSITION
fragData[PREPASS_LOCAL_POSITION_INDEX]=vec4f(geometryPositionL,geometryCoverage);
#endif
#ifdef PREPASS_DEPTH
fragData[PREPASS_DEPTH_INDEX]=vec4f(geometryViewDepth,0.0,0.0,geometryCoverage);
#endif
#ifdef PREPASS_NORMALIZED_VIEW_DEPTH
fragData[PREPASS_NORMALIZED_VIEW_DEPTH_INDEX]=vec4f(geometryNormalizedViewDepth,0.0,0.0,geometryCoverage);
#endif
#ifdef PREPASS_SCREENSPACE_DEPTH
fragData[PREPASS_SCREENSPACE_DEPTH_INDEX]=vec4f(fragmentInputs.position.z,0.0,0.0,geometryCoverage);
#endif
#ifdef PREPASS_NORMAL
fragData[PREPASS_NORMAL_INDEX]=vec4f(geometryNormalV,geometryCoverage);
#endif
#ifdef PREPASS_WORLD_NORMAL
fragData[PREPASS_WORLD_NORMAL_INDEX]=vec4f(geometryNormalW*0.5+0.5,geometryCoverage);
#endif
#ifdef PREPASS_ALBEDO
fragData[PREPASS_ALBEDO_INDEX]=vec4f(geometryAlbedo,geometryCoverage);
#endif
#ifdef PREPASS_ALBEDO_SQRT
fragData[PREPASS_ALBEDO_SQRT_INDEX]=vec4f(sqrt(max(geometryAlbedo,vec3f(0.0))),geometryCoverage);
#endif
#ifdef PREPASS_REFLECTIVITY
fragData[PREPASS_REFLECTIVITY_INDEX]=vec4f(0.0,0.0,0.0,geometryCoverage);
#endif
#ifdef PREPASS_IRRADIANCE
fragData[PREPASS_IRRADIANCE_INDEX]=vec4f(0.0,0.0,0.0,geometryCoverage);
#endif
#ifdef PREPASS_IRRADIANCE_LEGACY
fragData[PREPASS_IRRADIANCE_LEGACY_INDEX]=vec4f(0.0);
#endif
#if defined(PREPASS_VELOCITY) || defined(PREPASS_VELOCITY_LINEAR)
#ifdef PREPASS_VELOCITY_ZERO
let geometryMotion=vec2f(0.0);
#else
let geometryMotion=0.5*(geometryCurrentPosition.xy/geometryCurrentPosition.w-geometryPreviousPosition.xy/geometryPreviousPosition.w);
#endif
#ifdef PREPASS_VELOCITY
fragData[PREPASS_VELOCITY_INDEX]=vec4f(pow(abs(geometryMotion),vec2f(1.0/3.0))*sign(geometryMotion)*0.5+0.5,0.0,geometryCoverage);
#endif
#ifdef PREPASS_VELOCITY_LINEAR
fragData[PREPASS_VELOCITY_LINEAR_INDEX]=vec4f(-geometryMotion,0.0,geometryCoverage);
#endif
#endif
#ifdef PREPASS_OBJECT_ID
fragData[PREPASS_OBJECT_ID_INDEX]=encodeObjectId(uniforms.objectId)*geometryCoverage;
#endif
#ifdef PREPASS_MESH_BLEND_TAG
var meshBlendTagOutput: vec4<u32>=vec4u(0u);if (geometryCoverage>0.0) {meshBlendTagOutput=vec4u(u32(uniforms.meshBlendTag),0u,0u,0u);}
#endif
#include<meshBlendTagFragmentOutput>[0..8]
#endif
#endif
`;e.IncludesShadersStoreWGSL[f]||(e.IncludesShadersStoreWGSL[f]=p);var m={name:f,shader:p},h=`spritesPixelShader`,g=`uniform alphaTest: i32;
#include<prePassDeclaration>[SCENE_MRT_COUNT]
varying vColor: vec4f;
#ifdef PREPASS
uniform geometryZeroAlphaDiscard: f32;
#ifdef PREPASS_POSITION
varying vPositionW: vec3f;
#endif
#ifdef PREPASS_NORMAL
varying vNormalV: vec3f;
#endif
#ifdef PREPASS_WORLD_NORMAL
varying vNormalW: vec3f;
#endif
#endif
varying vUV: vec2f;var diffuseSamplerSampler: sampler;var diffuseSampler: texture_2d<f32>;
#include<fogFragmentDeclaration>
#include<logDepthDeclaration>
#include<helperFunctions>
#define CUSTOM_FRAGMENT_DEFINITIONS
#ifdef PIXEL_PERFECT
fn uvPixelPerfect(uv: vec2f)->vec2f {var res: vec2f= vec2f(textureDimensions(diffuseSampler,0));var uvTemp=uv*res;var seam: vec2f=floor(uvTemp+0.5);uvTemp=seam+clamp((uvTemp-seam)/fwidth(uvTemp),vec2f(-0.5),vec2f(0.5));return uvTemp/res;}
#endif
@fragment
fn main(input: FragmentInputs)->FragmentOutputs {
#define CUSTOM_FRAGMENT_MAIN_BEGIN
#ifdef PIXEL_PERFECT
var uv: vec2f=uvPixelPerfect(input.vUV);
#else
var uv: vec2f=input.vUV;
#endif
var color: vec4f=textureSample(diffuseSampler,diffuseSamplerSampler,uv);var fAlphaTest: f32= f32(uniforms.alphaTest);if (fAlphaTest != 0.)
{if (color.a<0.95) {discard;}}
color*=input.vColor;
#ifdef PREPASS
#if defined(PREPASS_ALBEDO) || defined(PREPASS_ALBEDO_SQRT)
var geometryAlbedo: vec3f=toLinearSpaceVec3(color.rgb);
#endif
if (fAlphaTest==0.0 && color.a==0.0 && uniforms.geometryZeroAlphaDiscard>0.0) {discard;}
#endif
#include<logDepthFragment>
#include<fogFragment>
#ifdef PREPASS
#include<imageProcessingCompatibility>(fragmentOutputs.color,color)
var geometryColor: vec4f=color;
#ifdef PREPASS_POSITION
var geometryPositionW: vec3f=input.vPositionW;
#endif
#ifdef PREPASS_LOCAL_POSITION
var geometryPositionL: vec3f=input.vPosition;
#endif
#ifdef PREPASS_DEPTH
var geometryViewDepth: f32=input.vViewPos.z;
#endif
#ifdef PREPASS_NORMALIZED_VIEW_DEPTH
var geometryNormalizedViewDepth: f32=input.vNormViewDepth;
#endif
#ifdef PREPASS_NORMAL
var geometryNormalV: vec3f=input.vNormalV;
#endif
#ifdef PREPASS_WORLD_NORMAL
var geometryNormalW: vec3f=input.vNormalW;
#endif
#if defined(PREPASS_VELOCITY) || defined(PREPASS_VELOCITY_LINEAR)
var geometryCurrentPosition: vec4f=input.vCurrentPosition;var geometryPreviousPosition: vec4f=input.vPreviousPosition;
#endif
#include<geometryRenderingFragment>
#else
fragmentOutputs.color=color;
#include<imageProcessingCompatibility>
#endif
#define CUSTOM_FRAGMENT_MAIN_END
}`;e.ShadersStoreWGSL[h]||(e.ShadersStoreWGSL[h]=g);var _=[r,a,t,c,s,i,n,d,o,m];for(let t of _)e.IncludesShadersStoreWGSL[t.name]||(e.IncludesShadersStoreWGSL[t.name]=t.shader);var v={name:h,shader:g};export{v as spritesPixelShaderWGSL};